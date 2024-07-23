/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Browser, Page, chromium } from 'playwright';
import { Socket } from 'socket.io';
import { PlaywrightClient } from 'src/common/playwright/playwright.client';
import { Action } from 'src/common/playwright/playwright.types';

@Injectable()
export class WebdriverService {
    private clients: Map<
        string,
        {
            browser: Browser;
            page: Page;
            isScreenshotRunning: boolean;
        }
    > = new Map();

    constructor(private configService: ConfigService) {}

    async setupWebdriverClient(client: Socket, id: string) {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        this.clients.set(id, {
            browser,
            page,
            isScreenshotRunning: true,
        });

        // Start the screenshot process immediately
        this.startScreenshotProcess(client, id);
    }

    private async startScreenshotProcess(client: Socket, id: string) {
        const clientSession = this.clients.get(id);
        if (!clientSession) {
            throw new Error('Client session not found');
        }

        const screenshotProcess = async () => {
            while (clientSession.isScreenshotRunning) {
                try {
                    const screenshot = (
                        await clientSession.page.screenshot()
                    ).toString('base64');
                    client.send(
                        JSON.stringify({
                            event: 'SCREENSHOT',
                            data: screenshot,
                        }),
                    );
                } catch (error) {
                    console.error('Error taking screenshot:', error);
                }
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        };

        screenshotProcess().catch((error) => {
            console.error('Screenshot process error:', error);
            clientSession.isScreenshotRunning = false;
        });
    }

    async executeActions(client: Socket, id: string, actions: Action[]) {
        const clientSession = this.clients.get(id);
        if (!clientSession) {
            throw new Error('Client session not found');
        }

        const playwrightClient = new PlaywrightClient(
            clientSession.browser,
            clientSession.page,
            this.configService,
        );

        try {
            for (const action of actions) {
                try {
                    const updatedAction =
                        await playwrightClient.executeAction(action);

                    client.send(
                        JSON.stringify({
                            event: 'SELECTOR_UPDATE',
                            data: updatedAction,
                        }),
                    );

                    const content = await clientSession.page.content();
                    const url = clientSession.page.url();
                    const hostname = new URL(url).hostname;
                    client.send(
                        JSON.stringify({
                            event: 'ACTION_RESULT',
                            data: {
                                actionType: action.type,
                                pageContent: content,
                                url: url,
                                hostname: hostname,
                                step: action,
                            },
                        }),
                    );
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
        } finally {
            client.send(
                JSON.stringify({
                    event: 'ACTIONS_COMPLETED',
                    data: {},
                }),
            );
        }
    }

    async cleanupWebdriverClient(id: string) {
        const clientSession = this.clients.get(id);
        if (clientSession) {
            clientSession.isScreenshotRunning = false;
            await clientSession.browser.close();
            this.clients.delete(id);
        }
    }
}
