import { Module } from '@nestjs/common';
import { WebdriverModule } from './webdriver/webdriver.module';
import { HealthModule } from './health/health.module';

@Module({
    imports: [WebdriverModule, HealthModule],
})
export class AppModule {}
