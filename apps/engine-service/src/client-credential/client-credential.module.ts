import { Module } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { ClientCredentialController } from './client-credential.controller';

@Module({
  controllers: [ClientCredentialController],
  providers: [ClientCredentialService],
})
export class ClientCredentialModule {}
