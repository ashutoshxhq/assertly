import { Module } from '@nestjs/common';
import { WebdriverService } from './webdriver.service';
import { WebdriverGateway } from './webdriver.gateway';

@Module({
  providers: [WebdriverGateway, WebdriverService],
})
export class WebdriverModule {}
