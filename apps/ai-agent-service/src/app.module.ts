import { Module } from '@nestjs/common';
import { AgentSocketModule } from './agent-socket/agent-socket.module';
import { ActionModule } from './action/action.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        CacheModule.register(),
        AgentSocketModule,
        ActionModule,
    ],
})
export class AppModule {}
