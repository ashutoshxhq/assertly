import { Module } from '@nestjs/common';
import { TestScheduleService } from './test-schedule.service';
import { TestScheduleController } from './test-schedule.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [TestScheduleController],
  providers: [TestScheduleService, PrismaService],
})
export class TestScheduleModule {}
