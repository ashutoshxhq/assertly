import { Test, TestingModule } from '@nestjs/testing';
import { UserFlowsService } from './user-flows.service';

describe('UserFlowsService', () => {
  let service: UserFlowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFlowsService],
    }).compile();

    service = module.get<UserFlowsService>(UserFlowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
