import { Module } from '@nestjs/common';
import { AgentSocketModule } from './agent-socket/agent-socket.module';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AgentSocketModule,
    ActionModule,
  ],
})
export class AppModule {}
