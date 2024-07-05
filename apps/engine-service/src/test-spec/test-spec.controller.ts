import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestSpecService } from './test-spec.service';
import { CreateTestSpecDto } from './dto/create-test-spec.dto';
import { UpdateTestSpecDto } from './dto/update-test-spec.dto';

@Controller('test-spec')
export class TestSpecController {
  constructor(private readonly testSpecService: TestSpecService) {}

  @Post()
  create(@Body() createTestSpecDto: CreateTestSpecDto) {
    return this.testSpecService.create(createTestSpecDto);
  }

  @Get()
  findAll() {
    return this.testSpecService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSpecService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSpecDto: UpdateTestSpecDto) {
    return this.testSpecService.update(+id, updateTestSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSpecService.remove(+id);
  }
}
