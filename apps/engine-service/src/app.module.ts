import { Module } from '@nestjs/common';
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
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    ArtifactsModule,
    TestSpecsModule,
    UserFlowsModule,
    TestSchedulesModule,
    StepsModule,
    TestRunsModule,
    ClientCredentialsModule,
    IntegrationsModule,
    HealthModule,
  ],
})
export class AppModule {}
