import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AgentSocketService } from './agent-socket.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AgentSocketGateway {
  constructor(private readonly agentSocketService: AgentSocketService) { }

  @SubscribeMessage('AGENT')
  async handleMessage(client: Socket, message: string): Promise<void> {
    this.agentSocketService.orchestrate(client, message)
  }
}
