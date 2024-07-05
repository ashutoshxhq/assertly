import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class IntegrationsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'integrations',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
