import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';

@Controller('test-run')
export class TestRunController {
  constructor(private readonly testRunService: TestRunService) {}

  @Post()
  create(@Body() createTestRunDto: CreateTestRunDto) {
    return this.testRunService.create(createTestRunDto);
  }

  @Get()
  findAll() {
    return this.testRunService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testRunService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestRunDto: UpdateTestRunDto) {
    return this.testRunService.update(+id, updateTestRunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testRunService.remove(+id);
  }
}
