import { Module } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { ClientCredentialController } from './client-credential.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ClientCredentialController],
  providers: [ClientCredentialService, PrismaService],
})
export class ClientCredentialModule {}
