import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AgentSocketService } from './agent-socket.service';
import { Socket } from 'socket.io';
import { ChatMessageDTO } from './dto/chat-message.dto';

@WebSocketGateway({ transports: ['websocket'], path: 'v1' })
export class AgentSocketGateway {
    constructor(private readonly agentSocketService: AgentSocketService) {}

    @SubscribeMessage('AGENT')
    async handleMessage(client: Socket, data: ChatMessageDTO): Promise<void> {
        try {
            await this.agentSocketService.orchestrate(client, data);
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
