import { Test, TestingModule } from '@nestjs/testing';
import { TestSpecService } from './test-spec.service';

describe('TestSpecService', () => {
  let service: TestSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSpecService],
    }).compile();

    service = module.get<TestSpecService>(TestSpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
