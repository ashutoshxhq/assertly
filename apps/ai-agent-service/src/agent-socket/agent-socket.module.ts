import { Module } from '@nestjs/common';
import { AgentSocketService } from './agent-socket.service';
import { AgentSocketGateway } from './agent-socket.gateway';
import { LanguageModelService } from 'src/language-model/language-model.service';

@Module({
    providers: [AgentSocketGateway, AgentSocketService, LanguageModelService],
})
export class AgentSocketModule {}
