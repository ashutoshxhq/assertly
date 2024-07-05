import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestSpecsService } from './test-specs.service';
import { CreateTestSpecDto } from './dto/create-test-spec.dto';
import { UpdateTestSpecDto } from './dto/update-test-spec.dto';

@Controller('test-specs')
export class TestSpecsController {
  constructor(private readonly testSpecsService: TestSpecsService) {}

  @Post()
  async create(@Body() createTestSpecDto: CreateTestSpecDto, @Query('query') query: string) {
    const created = await this.testSpecsService.create(createTestSpecDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.testSpecsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.testSpecsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestSpecDto: UpdateTestSpecDto,
    @Query('query') query: string,
  ) {
    const updated = await this.testSpecsService.update(id, updateTestSpecDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.testSpecsService.remove(id, { crudQuery: query });
  }
}
