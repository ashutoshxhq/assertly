import { Test, TestingModule } from '@nestjs/testing';
import { SessionRecordingController } from './session-recording.controller';
import { SessionRecordingService } from './session-recording.service';

describe('SessionRecordingController', () => {
  let controller: SessionRecordingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionRecordingController],
      providers: [SessionRecordingService],
    }).compile();

    controller = module.get<SessionRecordingController>(SessionRecordingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
