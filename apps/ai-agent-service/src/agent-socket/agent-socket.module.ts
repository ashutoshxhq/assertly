import { Module } from '@nestjs/common';
import { AgentSocketService } from './agent-socket.service';
import { AgentSocketGateway } from './agent-socket.gateway';

@Module({
    providers: [AgentSocketGateway, AgentSocketService],
})
export class AgentSocketModule {}
