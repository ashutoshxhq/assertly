import { Module } from '@nestjs/common';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './common/prisma/prisma.service';
import { ArtifactModule } from './artifact/artifact.module';
import { TestSpecModule } from './test-spec/test-spec.module';
import { UserFlowModule } from './user-flow/user-flow.module';
import { TestScheduleModule } from './test-schedule/test-schedule.module';
import { StepModule } from './steps/step.module';
import { TestRunModule } from './test-run/test-run.module';
import { IntegrationModule } from './integration/integration.module';
import { ClientCredentialModule } from './client-credential/client-credential.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    ArtifactModule,
    TestSpecModule,
    UserFlowModule,
    TestScheduleModule,
    StepModule,
    TestRunModule,
    ClientCredentialModule,
    IntegrationModule,
    HealthModule,
  ],
})
export class AppModule {}
