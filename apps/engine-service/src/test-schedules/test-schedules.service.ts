import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class TestSchedulesService extends PrismaCrudService {
  constructor() {
    super({
      model: 'testSchedules',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
