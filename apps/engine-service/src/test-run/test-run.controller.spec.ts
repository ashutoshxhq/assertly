import { Test, TestingModule } from '@nestjs/testing';
import { TestRunController } from './test-run.controller';
import { TestRunService } from './test-run.service';

describe('TestRunController', () => {
  let controller: TestRunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestRunController],
      providers: [TestRunService],
    }).compile();

    controller = module.get<TestRunController>(TestRunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
