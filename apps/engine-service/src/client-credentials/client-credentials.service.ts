import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class ClientCredentialsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'clientCredentials',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
