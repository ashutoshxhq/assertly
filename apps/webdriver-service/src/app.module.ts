import { Module } from '@nestjs/common';
import { WebdriverModule } from './webdriver/webdriver.module';

@Module({
  imports: [WebdriverModule],
})
export class AppModule {}
