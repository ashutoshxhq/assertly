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
import { TestScheduleService } from './test-schedule.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/test-schedules')
export class TestScheduleController {
  constructor(private readonly testSchedulesService: TestScheduleService) {}
  @Post()
  async create(@Body() createTestScheduleDto: Prisma.TestScheduleCreateArgs) {
    const created = await this.testSchedulesService.create(
      createTestScheduleDto,
    );
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testSchedulesService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.testSchedulesService.findOne({
      id: id,
    });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestScheduleDto: Prisma.TestScheduleUpdateArgs,
  ) {
    const updated = await this.testSchedulesService.update(
      updateTestScheduleDto,
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testSchedulesService.remove({ id });
  }
}
