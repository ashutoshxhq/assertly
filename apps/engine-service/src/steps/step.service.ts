import { Injectable } from '@nestjs/common';
import { Step, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StepService extends CrudService<
  Step,
  Prisma.StepCreateArgs,
  Prisma.StepUpdateArgs,
  Prisma.StepWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Step');
  }
}
