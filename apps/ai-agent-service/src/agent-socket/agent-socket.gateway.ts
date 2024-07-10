import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import type { AgentSocketService } from './agent-socket.service';
import type { Socket } from 'socket.io';
import { ChatMessageDTO } from './dto/chat-message.dto';

@WebSocketGateway()
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
