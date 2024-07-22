import { Module } from '@nestjs/common';
import { TestSpecController } from './test-spec.controller';
import { TestSpecService } from './test-spec.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Module({
  controllers: [TestSpecController],
  providers: [TestSpecService, PrismaService],
})
export class TestSpecModule {}
