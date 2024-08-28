import { Module } from '@nestjs/common';
import { SessionRecordingService } from './session-recording.service';
import { SessionRecordingController } from './session-recording.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [SessionRecordingController],
  providers: [SessionRecordingService, PrismaService],
})
export class SessionRecordingModule {}
