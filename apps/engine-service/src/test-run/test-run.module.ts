import { Module } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { TestRunController } from './test-run.controller';

@Module({
  controllers: [TestRunController],
  providers: [TestRunService],
})
export class TestRunModule {}
