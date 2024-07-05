import { Test, TestingModule } from '@nestjs/testing';
import { ClientCredentialService } from './client-credential.service';

describe('ClientCredentialService', () => {
  let service: ClientCredentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCredentialService],
    }).compile();

    service = module.get<ClientCredentialService>(ClientCredentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
