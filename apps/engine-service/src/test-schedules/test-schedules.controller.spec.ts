import { Test, TestingModule } from '@nestjs/testing';
import { TestSchedulesController } from './test-schedules.controller';
import { TestSchedulesService } from './test-schedules.service';

describe('TestSchedulesController', () => {
  let controller: TestSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSchedulesController],
      providers: [TestSchedulesService],
    }).compile();

    controller = module.get<TestSchedulesController>(TestSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
