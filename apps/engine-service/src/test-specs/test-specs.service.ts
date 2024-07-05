import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class TestSpecsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'testSpecs',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
