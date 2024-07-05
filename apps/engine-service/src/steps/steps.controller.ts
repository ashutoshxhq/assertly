import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('teams/:teamId/steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  async create(@Body() createStepDto: CreateStepDto, @Query('query') query: string) {
    const created = await this.stepsService.create(createStepDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.stepsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.stepsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStepDto: UpdateStepDto,
    @Query('query') query: string,
  ) {
    const updated = await this.stepsService.update(id, updateStepDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.stepsService.remove(id, { crudQuery: query });
  }
}
