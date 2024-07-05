import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Controller('teams/:teamId/integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  async create(@Body() createIntegrationDto: CreateIntegrationDto, @Query('query') query: string) {
    const created = await this.integrationsService.create(createIntegrationDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.integrationsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.integrationsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIntegrationDto: UpdateIntegrationDto,
    @Query('query') query: string,
  ) {
    const updated = await this.integrationsService.update(id, updateIntegrationDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.integrationsService.remove(id, { crudQuery: query });
  }
}
