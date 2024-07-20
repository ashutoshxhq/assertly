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
import { ClientCredentialService } from './client-credential.service';
import { Prisma } from '@prisma/client';

@Controller('v1/teams/:teamId/client-credentials')
export class ClientCredentialController {
  constructor(
    private readonly clientCredentialService: ClientCredentialService,
  ) {}

  @Post()
  async create(
    @Body() createClientCredentialDto: Prisma.ClientCredentialCreateArgs,
  ) {
    const created = await this.clientCredentialService.create(
      createClientCredentialDto,
    );
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.clientCredentialService.findAll(query);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.clientCredentialService.findOne(
      JSON.parse(query)?.where,
    );
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientCredentialDto: Prisma.ClientCredentialUpdateArgs,
  ) {
    const updated = await this.clientCredentialService.update(
      updateClientCredentialDto,
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.clientCredentialService.remove(JSON.parse(query)?.where);
  }
}
