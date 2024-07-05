import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class ArtifactsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'artifacts',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
