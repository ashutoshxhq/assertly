import { Module } from '@nestjs/common';
import { WebdriverModule } from './webdriver/webdriver.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env`,
        }),
        WebdriverModule,
        HealthModule,
    ],
})
export class AppModule {}
