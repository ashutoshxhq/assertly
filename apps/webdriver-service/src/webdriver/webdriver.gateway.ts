import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Action } from 'src/common/playwright/playwright.types';
import { WebdriverService } from './webdriver.service';

@WebSocketGateway({ transports: ['websocket'] })
export class WebdriverGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly webdriverService: WebdriverService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const searchParams = new URLSearchParams(args[0].url.split('?')[1]);
    const clientId = searchParams.get('clientId');
    client['data'] = {
      id: clientId,
    };
    await this.webdriverService.setupWebdriverClient(client, clientId);
  }

  async handleDisconnect(client: Socket) {
    if (client.data.id) {
      await this.webdriverService.cleanupWebdriverClient(client.data.id);
    }
  }

  @SubscribeMessage('ACTIONS')
  async handleMessage(
    client: Socket,
    message: { actions: Action[] },
  ): Promise<void> {
    try {
      await this.webdriverService.executeActions(
        client,
        client.data.id,
        message.actions,
      );
    } catch (error) {
      client.send(
        JSON.stringify({
          event: 'ERROR',
          data: { success: false, message: error.message },
        }),
      );
    }
  }
}
