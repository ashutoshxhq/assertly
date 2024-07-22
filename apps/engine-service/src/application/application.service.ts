import { Injectable } from '@nestjs/common';
import { Application, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ApplicationService extends CrudService<
  Application,
  Prisma.ApplicationCreateArgs,
  Prisma.ApplicationUpdateArgs,
  Prisma.ApplicationWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Application');
  }
}
