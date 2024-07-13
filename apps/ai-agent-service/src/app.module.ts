import { Module } from '@nestjs/common';
import { AgentSocketModule } from './agent-socket/agent-socket.module';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HealthModule } from './health/health.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        AgentSocketModule,
        ActionModule,
        HealthModule,
    ],
})
export class AppModule {}
