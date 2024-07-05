import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestSpecModule } from './test-spec/test-spec.module';
import { TestScheduleModule } from './test-schedule/test-schedule.module';
import { UserFlowModule } from './user-flow/user-flow.module';
import { TestRunModule } from './test-run/test-run.module';
import { IntegrationModule } from './integration/integration.module';
import { StepModule } from './step/step.module';
import { ClientCredentialModule } from './client-credential/client-credential.module';
import { ArtifactModule } from './artifact/artifact.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestSpecModule, TestScheduleModule, UserFlowModule, TestRunModule, IntegrationModule, StepModule, ClientCredentialModule, ArtifactModule],
})
export class AppModule {}
