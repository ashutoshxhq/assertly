import { Module } from '@nestjs/common';
import { TestSpecController } from './test-spec.controller';
import { TestSpecService } from './test-spec.service';
@Module({
  controllers: [TestSpecController],
  providers: [TestSpecService],
})
export class TestSpecModule {}
