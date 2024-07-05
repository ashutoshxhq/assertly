import { Module } from '@nestjs/common';
import { ClientCredentialsService } from './client-credentials.service';
import { ClientCredentialsController } from './client-credentials.controller';

@Module({
  controllers: [ClientCredentialsController],
  providers: [ClientCredentialsService]
})
export class ClientCredentialsModule {}
