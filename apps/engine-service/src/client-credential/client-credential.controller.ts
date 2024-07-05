import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { CreateClientCredentialDto } from './dto/create-client-credential.dto';
import { UpdateClientCredentialDto } from './dto/update-client-credential.dto';

@Controller('client-credential')
export class ClientCredentialController {
  constructor(private readonly clientCredentialService: ClientCredentialService) {}

  @Post()
  create(@Body() createClientCredentialDto: CreateClientCredentialDto) {
    return this.clientCredentialService.create(createClientCredentialDto);
  }

  @Get()
  findAll() {
    return this.clientCredentialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientCredentialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientCredentialDto: UpdateClientCredentialDto) {
    return this.clientCredentialService.update(+id, updateClientCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientCredentialService.remove(+id);
  }
}
