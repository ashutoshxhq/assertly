import { Injectable } from '@nestjs/common';
import { Project, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProjectService extends CrudService<
  Project,
  Prisma.ProjectCreateArgs,
  Prisma.ProjectUpdateArgs,
  Prisma.ProjectWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Project');
  }
}
