import { Module } from '@nestjs/common';
import { TestSpecService } from './test-spec.service';
import { TestSpecController } from './test-spec.controller';

@Module({
  controllers: [TestSpecController],
  providers: [TestSpecService],
})
export class TestSpecModule {}
