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
import { TestSpecService } from './test-spec.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/test-specs')
export class TestSpecController {
  constructor(private readonly testSpecService: TestSpecService) {}

  @Post()
  async create(@Body() createTestSpecDto: Prisma.TestSpecCreateArgs) {
    const created = await this.testSpecService.create(createTestSpecDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testSpecService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.testSpecService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestSpecDto: Prisma.TestSpecUpdateArgs,
  ) {
    const updated = await this.testSpecService.update(updateTestSpecDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testSpecService.remove({ id });
  }
}
