import { Module } from '@nestjs/common';
import { AgentSocketModule } from './agent-socket/agent-socket.module';
import { ActionModule } from './action/action.module';

@Module({
  imports: [AgentSocketModule, ActionModule],
})
export class AppModule {}
