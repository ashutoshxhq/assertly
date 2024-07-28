/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { findLocatorPrompt } from 'src/common/prompts/find-locator.prompt';
import { LanguageModelService } from 'src/language-model/language-model.service';
import { FindLocatorDTO } from './dto/find-locator.dto';
import { parse } from 'himalaya';

function cleanAndTrimContent(
    content,
    maxContentLength = 100,
    maxAttributeLength = 100,
) {
    const usefulAttributes = [
        'id',
        'class',
        'name',
        'href',
        'src',
        'alt',
        'title',
        'role',
        'type',
        'value',
        'placeholder',
    ];

    function isUsefulAttribute(key) {
        return (
            usefulAttributes.includes(key) ||
            key.startsWith('data-') ||
            key.startsWith('aria-')
        );
    }

    function processElement(element) {
        if (element.type === 'element') {
            // Process attributes
            if (element.attributes && element.attributes.length > 0) {
                element.attributes = element.attributes
                    .filter(
                        (attr) =>
                            isUsefulAttribute(attr.key) &&
                            attr.value.trim() !== '',
                    )
                    .map((attr) => ({
                        key: attr.key,
                        value:
                            typeof attr.value === 'string'
                                ? attr.value.trim().length > maxAttributeLength
                                    ? attr.value
                                          .trim()
                                          .slice(0, maxAttributeLength) + '...'
                                    : attr.value.trim()
                                : attr.value,
                    }));
            }

            // Remove the attributes property if it's empty
            if (element.attributes.length === 0) {
                delete element.attributes;
            }

            // Process children
            if (Array.isArray(element.children)) {
                element.children = element.children
                    .map(processElement)
                    .filter(
                        (item) =>
                            item !== null &&
                            (item.type !== 'text' ||
                                item.content.trim() !== ''),
                    );

                if (element.children.length === 0) {
                    delete element.children;
                }
            }

            // Remove the element if it has no attributes and no children
            if (!element.attributes && !element.children) {
                return null;
            }

            return element;
        } else if (element.type === 'text') {
            // Trim text content
            const trimmedContent = element.content.trim();
            if (trimmedContent === '') {
                return null; // Remove empty text nodes
            }
            element.content =
                trimmedContent.length > maxContentLength
                    ? trimmedContent.slice(0, maxContentLength) + '...'
                    : trimmedContent;
            return element;
        } else {
            return element;
        }
    }

    return Array.isArray(content)
        ? content.map(processElement).filter((item) => item !== null)
        : processElement(content);
}

function estimateJsonTokens(jsonData) {
    function countTokens(obj) {
        let count = 0;

        if (typeof obj === 'string') {
            // For strings, estimate based on words and punctuation
            count += obj.trim().split(/\s+/).length;
            count += (obj.match(/[^\w\s]/g) || []).length;
        } else if (typeof obj === 'number') {
            // For numbers, count as one token
            count += 1;
        } else if (Array.isArray(obj)) {
            // For arrays, count brackets and recursively count elements
            count += 2; // [ and ]
            for (const item of obj) {
                count += countTokens(item);
                count += 1; // For comma
            }
            count -= 1; // Remove last comma
        } else if (typeof obj === 'object' && obj !== null) {
            // For objects, count braces and recursively count key-value pairs
            count += 2; // { and }
            for (const key in obj) {
                count += countTokens(key);
                count += 1; // For colon
                count += countTokens(obj[key]);
                count += 1; // For comma
            }
            count -= 1; // Remove last comma
        } else if (typeof obj === 'boolean') {
            // For booleans, count as one token
            count += 1;
        }

        return count;
    }

    // Parse JSON if it's a string
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    // Get initial count
    let totalCount = countTokens(data);

    // Add a small factor for potential subword tokenization
    totalCount = Math.floor(totalCount * 1.1);

    return totalCount;
}

@Injectable()
export class ActionService {
    constructor(private llm: LanguageModelService) {}

    async findLocator(data: FindLocatorDTO) {
        const dom = new JSDOM(data.pageContent);
        const body = dom.window.document.body;
        // remove style, script, ig, svg tags
        const elements = body.querySelectorAll(
            'style, script, img, svg, iframe',
        );
        elements.forEach((element) => {
            element.remove();
        });
        const jsonBody = parse(body.innerHTML);

        const trimmedJsonBody = cleanAndTrimContent(jsonBody);
        // if (estimateJsonTokens(trimmedJsonBody) > 120000) {
        //     throw new Error('Content too large');
        // } else {

        // }

        console.log(JSON.stringify(trimmedJsonBody, null, 2));
        const prompt = findLocatorPrompt({
            message: data.message,
            pageContent: JSON.stringify(trimmedJsonBody),
        });

        const res = await this.llm.generate([
            {
                role: 'user',
                content: prompt,
            },
        ]);

        const locator = JSON.parse(res.data.message.content).locator;

        return {
            locator,
            usage: res.usage,
        };
    }
}
