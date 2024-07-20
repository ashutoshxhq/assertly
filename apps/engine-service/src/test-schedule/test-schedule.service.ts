import { Injectable } from '@nestjs/common';
import { TestSchedule, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TestScheduleService extends CrudService<
  TestSchedule,
  Prisma.TestScheduleCreateArgs,
  Prisma.TestScheduleUpdateArgs,
  Prisma.TestScheduleWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'TestSchedule');
  }
}
