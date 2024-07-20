import { Injectable } from '@nestjs/common';
import { Integration, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class IntegrationService extends CrudService<
  Integration,
  Prisma.IntegrationCreateArgs,
  Prisma.IntegrationUpdateArgs,
  Prisma.IntegrationWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Integration');
  }
}
