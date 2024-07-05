import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class UserFlowsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'userFlows',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
