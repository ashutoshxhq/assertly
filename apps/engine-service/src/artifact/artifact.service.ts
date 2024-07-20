import { Injectable } from '@nestjs/common';
import { Artifact, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ArtifactService extends CrudService<
  Artifact,
  Prisma.ArtifactCreateArgs,
  Prisma.ArtifactUpdateArgs,
  Prisma.ArtifactWhereUniqueInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Artifact');
  }
}
