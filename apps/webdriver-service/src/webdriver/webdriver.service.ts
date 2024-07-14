/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Browser, Page, chromium } from 'playwright';
import { Socket } from 'socket.io';
import { PlaywrightClient } from 'src/common/playwright/playwright.client';
import { Action } from 'src/common/playwright/playwright.types';

@Injectable()
export class WebdriverService {
    private clients: Map<string, { browser: Browser; page: Page }> = new Map();

    constructor(private configService: ConfigService) {}

    async setupWebdriverClient(client: Socket, id: string) {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        this.clients.set(id, { browser, page });
    }

    async cleanupWebdriverClient(id: string) {
        const clientSession = this.clients.get(id);
        if (clientSession) {
            await clientSession.browser.close();
            this.clients.delete(id);
        }
    }

    async executeActions(client: Socket, id: string, actions: Action[]) {
        const clientSession = this.clients.get(id);
        if (!clientSession) {
            throw new Error('Client session not found');
        }

        const playwrightClient = new PlaywrightClient(
            clientSession.browser,
            clientSession.page,
            this.configService
        );

        for (const action of actions) {
            try {
                const updatedActions = await playwrightClient.execute([action]);
                client.send(
                    JSON.stringify({
                        event: 'SELECTOR_UPDATE',
                        data: updatedActions[0],
                    }),
                );
                await clientSession.page.waitForLoadState('domcontentloaded');

                const content = await clientSession.page.content();
                const screenshot = (
                    await clientSession.page.screenshot()
                ).toString('base64');
                const url = clientSession.page.url();
                const hostname = new URL(url).hostname;
                client.send(
                    JSON.stringify({
                        event: 'ACTION_RESULT',
                        data: {
                            actionType: action.type,
                            pageContent: content,
                            screenshot: screenshot,
                            url: url,
                            hostname: hostname,
                        },
                    }),
                );
                await clientSession.page.waitForTimeout(1000);
            } catch (error) {
                client.send(
                    JSON.stringify({
                        event: 'ERROR',
                        data: {
                            message: `Error executing action: ${error.message}`,
                            actionType: action.type,
                        },
                    }),
                );
                break;
            }
        }
    }
}
