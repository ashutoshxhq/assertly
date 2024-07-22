import { Module } from '@nestjs/common';
import { ArtifactController } from './artifact.controller';
import { ArtifactService } from './artifact.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ArtifactController],
  providers: [ArtifactService, PrismaService],
})
export class ArtifactModule {}
