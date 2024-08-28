import { Module } from '@nestjs/common';
import { SessionRecordingService } from './session-recording.service';
import { SessionRecordingController } from './session-recording.controller';

@Module({
  controllers: [SessionRecordingController],
  providers: [SessionRecordingService],
})
export class SessionRecordingModule {}
