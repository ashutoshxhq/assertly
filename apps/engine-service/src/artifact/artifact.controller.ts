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
import { ArtifactService } from './artifact.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/artifacts')
export class ArtifactController {
  constructor(private readonly artifactService: ArtifactService) {}

  @Post()
  async create(@Body() createArtifactDto: Prisma.ArtifactCreateArgs) {
    const created = await this.artifactService.create(createArtifactDto);
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.artifactService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.artifactService.findOne(JSON.parse(query)?.where);
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtifactDto: Prisma.ArtifactUpdateArgs,
  ) {
    const updated = await this.artifactService.update(updateArtifactDto);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.artifactService.remove({ id });
  }
}
