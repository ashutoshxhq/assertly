import { Module } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { TestRunController } from './test-run.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [TestRunController],
  providers: [TestRunService, PrismaService],
})
export class TestRunModule {}
