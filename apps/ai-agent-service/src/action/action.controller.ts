import { Body, Controller, Post } from '@nestjs/common';
import { ActionService } from './action.service';
import { FindLocatorDTO } from './dto/find-locator.dto';

@Controller('v1/actions')
export class ActionController {
    constructor(private readonly actionService: ActionService) {}

    @Post('find-locator')
    async findLocator(@Body() data: FindLocatorDTO) {
        return await this.actionService.findLocator(data);
    }
}
