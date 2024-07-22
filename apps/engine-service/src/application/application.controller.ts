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
import { Prisma } from '@prisma/client';
import { ApplicationService } from './application.service';

@Controller('v1/teams/:teamId/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post()
  async create(@Body() createApplicationDto: Prisma.ApplicationCreateArgs) {
    const created = await this.applicationService.create(createApplicationDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.applicationService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.applicationService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: Prisma.ApplicationUpdateArgs,
  ) {
    const updated = await this.applicationService.update(updateApplicationDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.applicationService.remove({ id });
  }
}
