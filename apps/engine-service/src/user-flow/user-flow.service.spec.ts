import { Test, TestingModule } from '@nestjs/testing';
import { UserFlowService } from './user-flow.service';

describe('UserFlowService', () => {
  let service: UserFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFlowService],
    }).compile();

    service = module.get<UserFlowService>(UserFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
