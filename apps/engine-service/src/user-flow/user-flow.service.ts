import { Injectable } from '@nestjs/common';
import { UserFlow, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserFlowService extends CrudService<
  UserFlow,
  Prisma.UserFlowCreateArgs,
  Prisma.UserFlowUpdateArgs,
  Prisma.UserFlowWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'UserFlow');
  }
}
