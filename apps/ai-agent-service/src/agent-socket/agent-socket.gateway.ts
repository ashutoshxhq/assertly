import { WebSocketGateway } from '@nestjs/websockets';
import { AgentSocketService } from './agent-socket.service';

@WebSocketGateway()
export class AgentSocketGateway {
  constructor(private readonly agentSocketService: AgentSocketService) {}
}
