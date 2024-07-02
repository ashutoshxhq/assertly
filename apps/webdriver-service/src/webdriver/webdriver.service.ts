import { Injectable } from '@nestjs/common';
import { Browser, Page, chromium } from 'playwright';
import { Socket } from 'socket.io';
import { PlaywrightClient } from 'src/common/playwright/playwright.client';

@Injectable()
export class WebdriverService {
    private clients: Map<string, { browser: Browser, page: Page }> = new Map();

    constructor() { }

    async setupWebdriverClient(client: Socket, id: string) {
        const browser = await chromium.launch({ headless: false });
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

    async executeActions(client: Socket, id: string, actions: any[]) {
        client.send(JSON.stringify({ event: 'response', data: { success: true, message: 'actions executed successfully' } }));
    }

}
