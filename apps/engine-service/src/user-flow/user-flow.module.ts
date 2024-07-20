import { Module } from '@nestjs/common';
import { UserFlowService } from './user-flow.service';
import { UserFlowController } from './user-flow.controller';

@Module({
  controllers: [UserFlowController],
  providers: [UserFlowService],
})
export class UserFlowModule {}
