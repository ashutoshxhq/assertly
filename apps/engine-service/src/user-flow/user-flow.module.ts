import { Module } from '@nestjs/common';
import { UserFlowService } from './user-flow.service';
import { UserFlowController } from './user-flow.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [UserFlowController],
  providers: [UserFlowService, PrismaService],
})
export class UserFlowModule {}
