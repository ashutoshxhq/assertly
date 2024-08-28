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
import { Prisma } from '@prisma/client';
import { ProjectService } from './project.service';

@Controller('v1/teams/:teamId/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  async create(@Body() createProjectDto: Prisma.ProjectCreateArgs) {
    const created = await this.projectService.create(createProjectDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.projectService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const match = await this.projectService.findOne({ id });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: Prisma.ProjectUpdateArgs,
  ) {
    const updated = await this.projectService.update(updateProjectDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectService.remove({ id });
  }
}
