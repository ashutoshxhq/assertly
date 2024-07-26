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
        this.setupConsoleLogs(client, page);
        this.setupNetworkLogs(client, page);
    }

    private setupConsoleLogs(client: Socket, page: Page) {
        page.on('console', (msg) => {
            client.send(
                JSON.stringify({
                    event: 'CONSOLE_LOG',
                    data: {
                        type: msg.type(),
                        text: msg.text(),
                    },
                }),
            );
        });
    }

    private setupNetworkLogs(client: Socket, page: Page) {
        page.on('request', (request) => {
            let body = request.postData();
            try {
                body = JSON.parse(body);
            } catch (error) {
                // Ignore error
                body = null;
            }

            client.send(
                JSON.stringify({
                    event: 'NETWORK_REQUEST',
                    data: {
                        url: request.url(),
                        method: request.method(),
                        headers: request.headers(),
                        body: body,
                        timing: request.timing(),
                    },
                }),
            );
        });

        page.on('response', (response) => {
            client.send(
                JSON.stringify({
                    event: 'NETWORK_RESPONSE',
                    data: {
                        url: response.url(),
                        status: response.status(),
                        headers: response.headers(),
                    },
                }),
            );
        });
    }

    private async startScreenshotProcess(client: Socket, id: string) {
        const clientSession = this.clients.get(id);
        if (!clientSession) {
            throw new Error('Client session not found');
        }

        const screenshotProcess = async () => {
            while (
                clientSession.isScreenshotRunning &&
                clientSession.page.isClosed() === false
            ) {
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
                await new Promise((resolve) => setTimeout(resolve, 200));
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
                    await clientSession.page.waitForLoadState(
                        'domcontentloaded',
                    );

                    client.send(
                        JSON.stringify({
                            event: 'SELECTOR_UPDATE',
                            data: updatedAction,
                        }),
                    );

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
                                screenshot: screenshot,
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
                                step: action,
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
            await clientSession.browser.close();
            this.clients.delete(id);
        }
    }
}
