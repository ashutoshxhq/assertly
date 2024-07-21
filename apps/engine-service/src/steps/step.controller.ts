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
import { StepService } from './step.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/steps')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  async create(@Body() createStepDto: Prisma.StepCreateArgs) {
    const created = await this.stepService.create(createStepDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.stepService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.stepService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStepDto: Prisma.StepUpdateArgs,
  ) {
    const updated = await this.stepService.update(updateStepDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.stepService.remove({ id });
  }
}
