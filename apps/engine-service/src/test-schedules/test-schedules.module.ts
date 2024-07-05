import { Module } from '@nestjs/common';
import { TestSchedulesService } from './test-schedules.service';
import { TestSchedulesController } from './test-schedules.controller';

@Module({
  controllers: [TestSchedulesController],
  providers: [TestSchedulesService]
})
export class TestSchedulesModule {}
