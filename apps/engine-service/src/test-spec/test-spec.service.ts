import { Injectable } from '@nestjs/common';
import { TestSpec, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TestSpecService extends CrudService<
  TestSpec,
  Prisma.TestSpecCreateArgs,
  Prisma.TestSpecUpdateArgs,
  Prisma.TestSpecWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'TestSpec');
  }
}
