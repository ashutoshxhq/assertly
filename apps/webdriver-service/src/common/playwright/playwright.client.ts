import { Browser, Page } from 'playwright';
import { Action, ActionWithSelector, hasSelector } from './playwright.types';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';

export class PlaywrightClient {
    private browser: Browser;
    private page: Page;
    private configService: ConfigService;

    constructor(browser: Browser, page: Page, configService: ConfigService) {
        this.browser = browser;
        this.page = page;
        this.configService = configService;
    }

    async execute(actions: Action[]) {
        if (!this.page) {
            throw new Error(
                'PlaywrightClient not initialized. Call initialize() first.',
            );
        }
        for (const action of actions) {
            await this.executePlaywrightAction(action);
        }
        return actions;
    }

    async executeAction(action: Action, retries = 2) {
        if (!this.page) {
            throw new Error(
                'PlaywrightClient not initialized. Call initialize() first.',
            );
        }

        if (hasSelector(action)) {
            for (let attempt = 0; attempt <= retries; attempt++) {
                try {
                    action = (await this.ensureSelector(action)) as Action;
                    return await this.executePlaywrightAction(action);
                } catch (error) {
                    if (attempt === retries) {
                        console.error(
                            `Failed to execute ${action.type} action after ${retries} retries:`,
                            error,
                        );
                        throw error;
                    }
                    console.warn(
                        `Attempt ${attempt + 1} failed for ${action.type} action. Retrying...`,
                    );
                    if ('selector' in action.props) {
                        delete action.props.selector;
                    }
                }
            }
        } else {
            return await this.executePlaywrightAction(action);
        }

        throw new Error('Unexpected execution path');
    }

    private async ensureSelector(action: ActionWithSelector) {
        if ('selector' in action.props && !action.props.selector) {
            const selector = await this.findSelectorByQuery(action);
            return {
                ...action,
                props: {
                    ...action.props,
                    selector,
                },
            };
        }
        return action;
    }

    async executePlaywrightAction(action: Action) {
        if (!this.page) {
            throw new Error(
                'PlaywrightClient not initialized. Call initialize() first.',
            );
        }

        switch (action.type) {
            case 'javascript':
                await this.page.evaluate(action.props.script);
                break;

            case 'visual-assert':
            case 'ai-assert':
                const screenshot = (await this.page.screenshot()).toString(
                    'base64',
                );
                action['result'] = await this.aiAssert(action, screenshot);
                break;

            case 'goto':
                await this.page.goto(action.props.url);
                break;

            case 'click':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.click(action.props.selector);
                break;

            case 'type':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.click(action.props.selector);
                await this.page.keyboard.type(action.props.text);
                break;

            case 'press':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.press(action.props.selector, action.props.key);
                break;

            case 'hover':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.hover(action.props.selector);
                break;

            case 'scroll':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.click(action.props.selector);
                break;

            case 'select':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.selectOption(
                    action.props.selector,
                    action.props.value,
                );
                break;

            case 'wait':
                if (action.props.selector || action.props.selectorQuery) {
                    action.props.selector =
                        await this.findSelectorByQuery(action);
                    await this.page.waitForSelector(action.props.selector);
                } else {
                    await this.page.waitForTimeout(action.props.timeout);
                }
                break;

            case 'localstorage':
                if (action.props.operation === 'set') {
                    await this.page.evaluate(
                        ({ key, value }) => {
                            localStorage.setItem(key, value);
                        },
                        { key: action.props.key, value: action.props.value },
                    );
                } else if (action.props.operation === 'get') {
                    return await this.page.evaluate(
                        (key) => localStorage.getItem(key),
                        action.props.key,
                    );
                }
                break;

            case 'file-upload':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.setInputFiles(
                    action.props.selector,
                    action.props.files,
                );
                break;

            default:
                console.log(`Unknown action type`);
        }

        return action;
    }

    async aiAssert(action: Action, screenshot: string) {
        try {
            if (
                action?.type === 'ai-assert' ||
                action?.type === 'visual-assert'
            ) {
                const formData = new FormData();
                formData.append('assertion', action.props.assertion);
                formData.append('screenshot', screenshot);

                const response = await axios.post(
                    `${this.configService.get('AI_AGENT_SERVICE_URL', 'http://localhost:8000')}/v1/actions/ai-assert`,
                    formData,
                    {
                        headers: {
                            ...formData.getHeaders(),
                        },
                        maxBodyLength: Infinity,
                    },
                );
                return response.data;
            } else {
                throw new Error('No screenshot found in action');
            }
        } catch (error) {
            console.error('Error asserting screenshot', error);
            throw error;
        }
    }

    async findSelectorByQuery(action) {
        try {
            if (action?.props?.selector) {
                return action.props.selector;
            } else if (action?.props?.selectorQuery) {
                const formData = new FormData();
                formData.append('message', action.props.selectorQuery);
                formData.append('pageContent', await this.page.content());

                const response = await axios.post(
                    `${this.configService.get('AI_AGENT_SERVICE_URL', 'http://localhost:8000')}/v1/actions/find-locator`,
                    formData,
                    {
                        headers: {
                            ...formData.getHeaders(),
                        },
                        maxBodyLength: Infinity,
                    },
                );
                return response.data.locator;
            } else {
                throw new Error('No selector or selectorQuery found in action');
            }
        } catch (error) {
            console.error('Error finding selector by query', error);
            throw error;
        }
    }
}
