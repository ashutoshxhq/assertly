import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebdriverService } from './webdriver.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class WebdriverGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly webdriverService: WebdriverService) { }

  async handleConnection(client: Socket, ...args: any[]) {
    await this.webdriverService.setupWebdriverClient(client, "test-1")
  }

  async handleDisconnect(client: Socket) {
    await this.webdriverService.cleanupWebdriverClient("test-1")
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, message: any): Promise<void> {
    try {
      await this.webdriverService.executeActions(client, message.id, message.actions)
    } catch (error) {
      client.send(JSON.stringify({ event: 'result', data: { success: false, message: error.message } }));
    }
  }
}
