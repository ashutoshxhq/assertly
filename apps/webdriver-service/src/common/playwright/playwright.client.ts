import { Browser, Page } from 'playwright';
import { Action } from './playwright.types';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

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
            await this.executeAction(action);
        }
        return actions;
    }

    async executeAction(action: Action) {
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
                console.log('Visual diff not implemented in this wrapper.');
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
                await this.page.evaluate((selector) => {
                    document.querySelector(selector)?.scrollIntoView();
                }, action.props.selector);
                break;

            case 'select':
                action.props.selector = await this.findSelectorByQuery(action);
                await this.page.selectOption(
                    action.props.selector,
                    action.props.value,
                );
                break;

            case 'wait':
                action.props.selector = await this.findSelectorByQuery(action);
                if (action.props.selector) {
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

    async findSelectorByQuery(action) {
        try {
            if (action?.props?.selector) {
                return action.props.selector;
            } else if (action?.props?.selectorQuery) {
                const response = await axios.post(
                    `${this.configService.get('AI_AGENT_SERVICE_URL', 'http://localhost:8000')}/v1/actions/find-locator`,
                    {
                        message: action.props.selectorQuery,
                        pageContent: await this.page.content(),
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
