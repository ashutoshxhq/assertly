import { Test, TestingModule } from '@nestjs/testing';
import { TestSpecsController } from './test-specs.controller';
import { TestSpecsService } from './test-specs.service';

describe('TestSpecsController', () => {
  let controller: TestSpecsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSpecsController],
      providers: [TestSpecsService],
    }).compile();

    controller = module.get<TestSpecsController>(TestSpecsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
