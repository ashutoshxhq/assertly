import { Test, TestingModule } from '@nestjs/testing';
import { ClientCredentialsController } from './client-credentials.controller';
import { ClientCredentialsService } from './client-credentials.service';

describe('ClientCredentialsController', () => {
  let controller: ClientCredentialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCredentialsController],
      providers: [ClientCredentialsService],
    }).compile();

    controller = module.get<ClientCredentialsController>(ClientCredentialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
