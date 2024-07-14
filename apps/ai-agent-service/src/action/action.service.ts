/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { findLocatorPrompt } from 'src/common/prompts/find-locator.prompt';
import { LanguageModelService } from 'src/language-model/language-model.service';
import { FindLocatorDTO } from './dto/find-locator.dto';
import { HTMLToJSON } from 'html-to-json-parser';

function cleanAndTrimContent(
    content,
    maxContentLength = 100,
    maxAttributeLength = 100,
) {
    function processElement(element) {

        if (element !== null) {
            // Remove SVG and image elements
            if (['svg', 'img'].includes(element.type?.toLowerCase())) {
                console.log("Removing SVG and image elements");
                return null;
            }

            // Process attributes
            if (element.attributes) {
                const newAttributes = {};
                for (const [key, value] of Object.entries(element.attributes)) {
                    if (typeof value === 'string') {
                        newAttributes[key] =
                            value.length > maxAttributeLength
                                ? value.slice(0, maxAttributeLength) + '...'
                                : value;
                    } else {
                        newAttributes[key] = value;
                    }
                }
                element.attributes = newAttributes;
            }

            // Process content
            if (Array.isArray(element.content)) {
                const newContent = element.content
                    .map(processElement)
                    .filter((item) => item !== null);

                if (newContent.length === 0) {
                    return null; // Remove empty elements
                }

                element.content = newContent;
            }

            // Trim text content
            if (typeof element.content === 'string') {
                element.content =
                    element.content.length > maxContentLength
                        ? element.content.slice(0, maxContentLength) + '...'
                        : element.content;
            }

            return element;
        } else if (typeof element.content === 'string') {
            return element.length > maxContentLength
                ? element.slice(0, maxContentLength) + '...'
                : element;
        } else {
            return element;
        }
    }

    return processElement(JSON.parse(content));
}

@Injectable()
export class ActionService {
    constructor(private llm: LanguageModelService) {}

    async findLocator(data: FindLocatorDTO) {
        const dom = new JSDOM(data.pageContent);
        const body = dom.window.document.body;
        body.querySelectorAll('script, style, iframe').forEach((element) =>
            element.remove(),
        );
        // const bodyContent = body.innerHTML;
        const jsonBody = await HTMLToJSON(body, true);
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

        const locator = JSON.parse(res.message.content).locator;

        return {
            locator,
        };
    }
}
