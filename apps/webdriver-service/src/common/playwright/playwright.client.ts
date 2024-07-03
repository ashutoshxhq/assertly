import { Browser, Page } from 'playwright';
import { Action } from './playwright.types';

export class PlaywrightClient {
  private browser: Browser;
  private page: Page;

  constructor(browser: Browser, page: Page) {
    this.browser = browser
    this.page = page
  }

  async execute(actions: Action[]) {
    if (!this.page) {
      throw new Error('PlaywrightClient not initialized. Call initialize() first.');
    }
    for (const action of actions) {
      await this.executeAction(action);
    }
  }

  private async executeAction(action: Action) {
    if (!this.page) {
      throw new Error('PlaywrightClient not initialized. Call initialize() first.');
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
        await this.page.click(action.props.selector);
        break;

      case 'type':
        await this.page.click(action.props.selector);
        await this.page.keyboard.type(action.props.text);
        break;

      case 'press':
        await this.page.press(action.props.selector, action.props.key);
        break;

      case 'hover':
        await this.page.hover(action.props.selector);
        break;

      case 'scroll':
        await this.page.evaluate((selector) => {
          document.querySelector(selector)?.scrollIntoView();
        }, action.props.selector);
        break;

      case 'select':
        await this.page.selectOption(action.props.selector, action.props.value);
        break;

      case 'wait':
        if (action.props.selector) {
          await this.page.waitForSelector(action.props.selector);
        } else {
          await this.page.waitForTimeout(action.props.timeout);
        }
        break;

      case 'localstorage':
        if (action.props.operation === 'set') {
          await this.page.evaluate(({ key, value }) => {
            localStorage.setItem(key, value);
          }, { key: action.props.key, value: action.props.value });
        } else if (action.props.operation === 'get') {
          return await this.page.evaluate((key) => localStorage.getItem(key), action.props.key);
        }
        break;

      case 'file-upload':
        await this.page.setInputFiles(action.props.selector, action.props.files);
        break;

      default:
        console.log(`Unknown action type`);
    }
  }
}