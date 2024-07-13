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
import { UserFlowsService } from './user-flows.service';
import { CreateUserFlowDto } from './dto/create-user-flow.dto';
import { UpdateUserFlowDto } from './dto/update-user-flow.dto';

@Controller('v1/teams/:teamId/user-flows')
export class UserFlowsController {
  constructor(private readonly userFlowsService: UserFlowsService) {}

  @Post()
  async create(
    @Body() createUserFlowDto: CreateUserFlowDto,
    @Query('query') query: string,
  ) {
    const created = await this.userFlowsService.create(createUserFlowDto, {
      crudQuery: query,
    });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.userFlowsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.userFlowsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserFlowDto: UpdateUserFlowDto,
    @Query('query') query: string,
  ) {
    const updated = await this.userFlowsService.update(id, updateUserFlowDto, {
      crudQuery: query,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.userFlowsService.remove(id, { crudQuery: query });
  }
}
