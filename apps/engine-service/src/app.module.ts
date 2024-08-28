import { Module } from '@nestjs/common';
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
import { ProjectModule } from './project/project.module';
import { SessionRecordingModule } from './session-recording/session-recording.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
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
    ProjectModule,
    SessionRecordingModule,
  ],
})
export class AppModule {}
