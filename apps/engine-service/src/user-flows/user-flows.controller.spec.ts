import { Test, TestingModule } from '@nestjs/testing';
import { UserFlowsController } from './user-flows.controller';
import { UserFlowsService } from './user-flows.service';

describe('UserFlowsController', () => {
  let controller: UserFlowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFlowsController],
      providers: [UserFlowsService],
    }).compile();

    controller = module.get<UserFlowsController>(UserFlowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
