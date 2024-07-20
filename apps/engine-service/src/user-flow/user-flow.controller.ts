import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserFlowService } from './user-flow.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/test-runs')
export class UserFlowController {
  constructor(private readonly userFlowService: UserFlowService) {}

  @Post()
  async create(@Body() createUserFlowDto: Prisma.UserFlowCreateArgs) {
    const created = await this.userFlowService.create(createUserFlowDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.userFlowService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.userFlowService.findOne(JSON.parse(query)?.where);
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserFlowDto: Prisma.UserFlowUpdateArgs,
  ) {
    const updated = await this.userFlowService.update(updateUserFlowDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.userFlowService.remove(JSON.parse(query)?.where);
  }
}
