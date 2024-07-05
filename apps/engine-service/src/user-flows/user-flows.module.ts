import { Module } from '@nestjs/common';
import { UserFlowsService } from './user-flows.service';
import { UserFlowsController } from './user-flows.controller';

@Module({
  controllers: [UserFlowsController],
  providers: [UserFlowsService]
})
export class UserFlowsModule {}
