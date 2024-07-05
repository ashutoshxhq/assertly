import { Injectable } from '@nestjs/common';
import { CreateUserFlowDto } from './dto/create-user-flow.dto';
import { UpdateUserFlowDto } from './dto/update-user-flow.dto';

@Injectable()
export class UserFlowService {
  create(createUserFlowDto: CreateUserFlowDto) {
    return 'This action adds a new userFlow';
  }

  findAll() {
    return `This action returns all userFlow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFlow`;
  }

  update(id: number, updateUserFlowDto: UpdateUserFlowDto) {
    return `This action updates a #${id} userFlow`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFlow`;
  }
}
