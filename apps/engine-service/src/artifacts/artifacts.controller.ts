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
import { ArtifactsService } from './artifacts.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@Controller('v1/teams/:teamId/artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Post()
  async create(
    @Body() createArtifactDto: CreateArtifactDto,
    @Query('query') query: string,
  ) {
    const created = await this.artifactsService.create(createArtifactDto, {
      crudQuery: query,
    });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.artifactsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.artifactsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtifactDto: UpdateArtifactDto,
    @Query('query') query: string,
  ) {
    const updated = await this.artifactsService.update(id, updateArtifactDto, {
      crudQuery: query,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.artifactsService.remove(id, { crudQuery: query });
  }
}
