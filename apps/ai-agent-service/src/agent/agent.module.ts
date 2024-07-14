/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { LanguageModelService } from 'src/language-model/language-model.service';

@Module({
    controllers: [AgentController],
    providers: [AgentService, LanguageModelService],
})
export class AgentModule {}
