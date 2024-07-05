import { Test, TestingModule } from '@nestjs/testing';
import { TestSpecController } from './test-spec.controller';
import { TestSpecService } from './test-spec.service';

describe('TestSpecController', () => {
  let controller: TestSpecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSpecController],
      providers: [TestSpecService],
    }).compile();

    controller = module.get<TestSpecController>(TestSpecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
