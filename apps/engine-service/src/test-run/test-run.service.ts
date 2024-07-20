import { Injectable } from '@nestjs/common';
import { TestRun, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TestRunService extends CrudService<
  TestRun,
  Prisma.TestRunCreateArgs,
  Prisma.TestRunUpdateArgs,
  Prisma.TestRunWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'TestRun');
  }
}
