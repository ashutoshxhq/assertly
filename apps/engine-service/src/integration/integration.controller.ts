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
import { IntegrationService } from './integration.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  async create(@Body() createIntegrationDto: Prisma.IntegrationCreateArgs) {
    const created = await this.integrationService.create(createIntegrationDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.integrationService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.integrationService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIntegrationDto: Prisma.IntegrationUpdateArgs,
  ) {
    const updated = await this.integrationService.update(updateIntegrationDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.integrationService.remove({ id });
  }
}
