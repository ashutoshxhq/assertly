import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService],
})
export class ApplicationModule {}
