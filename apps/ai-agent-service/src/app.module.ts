import { Module } from '@nestjs/common';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HealthModule } from './health/health.module';
import { AgentModule } from './agent/agent.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        ActionModule,
        HealthModule,
        AgentModule,
    ],
})
export class AppModule {}
