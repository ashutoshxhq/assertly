import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { LanguageModelService } from 'src/language-model/language-model.service';

@Module({
    controllers: [ActionController],
    providers: [ActionService, LanguageModelService],
})
export class ActionModule {}
