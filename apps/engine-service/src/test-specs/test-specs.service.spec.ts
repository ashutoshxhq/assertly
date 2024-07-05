import { Test, TestingModule } from '@nestjs/testing';
import { TestSpecsService } from './test-specs.service';

describe('TestSpecsService', () => {
  let service: TestSpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSpecsService],
    }).compile();

    service = module.get<TestSpecsService>(TestSpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
