import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestScheduleService } from './test-schedule.service';
import { CreateTestScheduleDto } from './dto/create-test-schedule.dto';
import { UpdateTestScheduleDto } from './dto/update-test-schedule.dto';

@Controller('test-schedule')
export class TestScheduleController {
  constructor(private readonly testScheduleService: TestScheduleService) {}

  @Post()
  create(@Body() createTestScheduleDto: CreateTestScheduleDto) {
    return this.testScheduleService.create(createTestScheduleDto);
  }

  @Get()
  findAll() {
    return this.testScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestScheduleDto: UpdateTestScheduleDto) {
    return this.testScheduleService.update(+id, updateTestScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testScheduleService.remove(+id);
  }
}
