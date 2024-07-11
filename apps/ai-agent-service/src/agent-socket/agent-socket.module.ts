import { Module } from '@nestjs/common';
import { AgentSocketService } from './agent-socket.service';
import { AgentSocketGateway } from './agent-socket.gateway';
import { LanguageModelModule } from '../language-model/language-model.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [LanguageModelModule, CacheModule.register()],
    providers: [AgentSocketGateway, AgentSocketService],
})
export class AgentSocketModule {}
