import { Module } from '@nestjs/common';
import { LanguageModelService } from './language-model.service';

@Module({
    providers: [LanguageModelService],
    exports: [LanguageModelService],
})
export class LanguageModelModule {}
