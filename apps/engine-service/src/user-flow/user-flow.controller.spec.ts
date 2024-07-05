import { Test, TestingModule } from '@nestjs/testing';
import { UserFlowController } from './user-flow.controller';
import { UserFlowService } from './user-flow.service';

describe('UserFlowController', () => {
  let controller: UserFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFlowController],
      providers: [UserFlowService],
    }).compile();

    controller = module.get<UserFlowController>(UserFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
