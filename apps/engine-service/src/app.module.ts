import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './common/prisma/prisma.service';
import { ArtifactsModule } from './artifacts/artifacts.module';
import { TestSpecsModule } from './test-specs/test-specs.module';
import { UserFlowsModule } from './user-flows/user-flows.module';
import { TestSchedulesModule } from './test-schedules/test-schedules.module';
import { StepsModule } from './steps/steps.module';
import { TestRunsModule } from './test-runs/test-runs.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ClientCredentialsModule } from './client-credentials/client-credentials.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaCrudModule.register({
    prismaService: PrismaService,
  }), ArtifactsModule, TestSpecsModule, UserFlowsModule, TestSchedulesModule, StepsModule, TestRunsModule, ClientCredentialsModule, IntegrationsModule],
})
export class AppModule { }
