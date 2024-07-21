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
import { TestRunService } from './test-run.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/test-runs')
export class TestRunController {
  constructor(private readonly testRunService: TestRunService) {}

  @Post()
  async create(@Body() createTestRunDto: Prisma.TestRunCreateArgs) {
    const created = await this.testRunService.create(createTestRunDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testRunService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.testRunService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestRunDto: Prisma.TestRunUpdateArgs,
  ) {
    const updated = await this.testRunService.update(updateTestRunDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testRunService.remove({ id });
  }
}
