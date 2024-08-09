/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { findLocatorPrompt } from 'src/common/prompts/find-locator.prompt';
import { LanguageModelService } from 'src/language-model/language-model.service';
import { FindLocatorDTO } from './dto/find-locator.dto';
import { parse } from 'himalaya';
import { aiAssertPrompt } from 'src/common/prompts/ai-assert.prompt';

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

@Injectable()
export class ActionService {
    constructor(private llm: LanguageModelService) {}

    async findLocator(data: FindLocatorDTO) {
        const dom = new JSDOM(data.pageContent);
        const body = dom.window.document.body;
        const elements = body.querySelectorAll(
            'style, script, img, svg, iframe',
        );
        elements.forEach((element) => {
            element.remove();
        });
        const jsonBody = parse(body.innerHTML);

        const trimmedJsonBody = cleanAndTrimContent(jsonBody);
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

    async aiAssert(data: any) {
        const assertion = data.assertion;
        const screenshot = data.screenshot;

        const prompt = aiAssertPrompt({ assertion });

        const res = await this.llm.generate([
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: prompt,
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${screenshot}`
                        },
                    }
                ],
            }
        ]);

        const response = JSON.parse(res.data.message.content);

        return response;
    }
}
