import { Module } from '@nestjs/common';
import { TestScheduleService } from './test-schedule.service';
import { TestScheduleController } from './test-schedule.controller';

@Module({
  controllers: [TestScheduleController],
  providers: [TestScheduleService],
})
export class TestScheduleModule {}
