import { Test, TestingModule } from '@nestjs/testing';
import { SessionRecordingService } from './session-recording.service';

describe('SessionRecordingService', () => {
  let service: SessionRecordingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionRecordingService],
    }).compile();

    service = module.get<SessionRecordingService>(SessionRecordingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
