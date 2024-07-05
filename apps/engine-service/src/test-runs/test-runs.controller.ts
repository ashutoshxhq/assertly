import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestRunsService } from './test-runs.service';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';

@Controller('teams/:teamId/test-runs')
export class TestRunsController {
  constructor(private readonly testRunsService: TestRunsService) {}

  @Post()
  async create(@Body() createTestRunDto: CreateTestRunDto, @Query('query') query: string) {
    const created = await this.testRunsService.create(createTestRunDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testRunsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.testRunsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestRunDto: UpdateTestRunDto,
    @Query('query') query: string,
  ) {
    const updated = await this.testRunsService.update(id, updateTestRunDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.testRunsService.remove(id, { crudQuery: query });
  }
}
