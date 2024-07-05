import { Module } from '@nestjs/common';
import { TestSpecsService } from './test-specs.service';
import { TestSpecsController } from './test-specs.controller';

@Module({
  controllers: [TestSpecsController],
  providers: [TestSpecsService]
})
export class TestSpecsModule {}
