import { Injectable } from '@nestjs/common';
import { CreateTestSpecDto } from './dto/create-test-spec.dto';
import { UpdateTestSpecDto } from './dto/update-test-spec.dto';

@Injectable()
export class TestSpecService {
  create(createTestSpecDto: CreateTestSpecDto) {
    return 'This action adds a new testSpec';
  }

  findAll() {
    return `This action returns all testSpec`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSpec`;
  }

  update(id: number, updateTestSpecDto: UpdateTestSpecDto) {
    return `This action updates a #${id} testSpec`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSpec`;
  }
}
