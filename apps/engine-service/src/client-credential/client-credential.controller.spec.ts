import { Test, TestingModule } from '@nestjs/testing';
import { ClientCredentialController } from './client-credential.controller';
import { ClientCredentialService } from './client-credential.service';

describe('ClientCredentialController', () => {
  let controller: ClientCredentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCredentialController],
      providers: [ClientCredentialService],
    }).compile();

    controller = module.get<ClientCredentialController>(ClientCredentialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
