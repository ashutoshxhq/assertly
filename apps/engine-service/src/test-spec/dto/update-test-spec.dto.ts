import { PartialType } from '@nestjs/mapped-types';
import { CreateTestSpecDto } from './create-test-spec.dto';

export class UpdateTestSpecDto extends PartialType(CreateTestSpecDto) {}
