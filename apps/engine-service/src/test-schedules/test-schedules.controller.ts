import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestSchedulesService } from './test-schedules.service';
import { CreateTestScheduleDto } from './dto/create-test-schedule.dto';
import { UpdateTestScheduleDto } from './dto/update-test-schedule.dto';

@Controller('teams/:teamId/test-schedules')
export class TestSchedulesController {
  constructor(private readonly testSchedulesService: TestSchedulesService) {}

  @Post()
  async create(@Body() createTestScheduleDto: CreateTestScheduleDto, @Query('query') query: string) {
    const created = await this.testSchedulesService.create(createTestScheduleDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testSchedulesService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.testSchedulesService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestScheduleDto: UpdateTestScheduleDto,
    @Query('query') query: string,
  ) {
    const updated = await this.testSchedulesService.update(id, updateTestScheduleDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.testSchedulesService.remove(id, { crudQuery: query });
  }
}
