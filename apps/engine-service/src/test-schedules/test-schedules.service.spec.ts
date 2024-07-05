import { Test, TestingModule } from '@nestjs/testing';
import { TestSchedulesService } from './test-schedules.service';

describe('TestSchedulesService', () => {
  let service: TestSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSchedulesService],
    }).compile();

    service = module.get<TestSchedulesService>(TestSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
