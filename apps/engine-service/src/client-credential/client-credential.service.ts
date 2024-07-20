import { Injectable } from '@nestjs/common';
import { ClientCredential, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ClientCredentialService extends CrudService<
  ClientCredential,
  Prisma.ClientCredentialCreateArgs,
  Prisma.ClientCredentialUpdateArgs,
  Prisma.ClientCredentialWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'ClientCredential');
  }
}
