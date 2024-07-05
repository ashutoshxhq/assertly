import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientCredentialsService } from './client-credentials.service';
import { CreateClientCredentialDto } from './dto/create-client-credential.dto';
import { UpdateClientCredentialDto } from './dto/update-client-credential.dto';

@Controller('client-credentials')
export class ClientCredentialsController {
  constructor(private readonly clientCredentialsService: ClientCredentialsService) {}

  @Post()
  async create(@Body() createClientCredentialDto: CreateClientCredentialDto, @Query('query') query: string) {
    const created = await this.clientCredentialsService.create(createClientCredentialDto, { crudQuery: query });
    return created;
  }

  @Get()
  async findMany(@Query('query') query: string) {
    const matches = await this.clientCredentialsService.findMany({ crudQuery: query });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('query') query: string) {
    const match = await this.clientCredentialsService.findOne(id, { crudQuery: query });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientCredentialDto: UpdateClientCredentialDto,
    @Query('query') query: string,
  ) {
    const updated = await this.clientCredentialsService.update(id, updateClientCredentialDto, { crudQuery: query });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('query') query: string) {
    return this.clientCredentialsService.remove(id, { crudQuery: query });
  }
}
