import { Injectable } from '@nestjs/common';
import { CreateClientCredentialDto } from './dto/create-client-credential.dto';
import { UpdateClientCredentialDto } from './dto/update-client-credential.dto';

@Injectable()
export class ClientCredentialService {
  create(createClientCredentialDto: CreateClientCredentialDto) {
    return 'This action adds a new clientCredential';
  }

  findAll() {
    return `This action returns all clientCredential`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientCredential`;
  }

  update(id: number, updateClientCredentialDto: UpdateClientCredentialDto) {
    return `This action updates a #${id} clientCredential`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientCredential`;
  }
}
