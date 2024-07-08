import { Module } from '@nestjs/common';
import { WebdriverGateway } from './webdriver.gateway';
import { WebdriverService } from './webdriver.service';

@Module({
  providers: [WebdriverGateway, WebdriverService],
})
export class WebdriverModule {}
