import { Module } from '@nestjs/common';
import { PlayWriteService } from './playwrite.service';

@Module({
  providers: [PlayWriteService],
  imports: [],
})
export class PlayWriteModule {}
