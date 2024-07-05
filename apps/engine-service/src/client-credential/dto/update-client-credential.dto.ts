import { PartialType } from '@nestjs/mapped-types';
import { CreateClientCredentialDto } from './create-client-credential.dto';

export class UpdateClientCredentialDto extends PartialType(CreateClientCredentialDto) {}
