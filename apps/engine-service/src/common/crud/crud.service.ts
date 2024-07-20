import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CrudService<T, CreateArgs, UpdateArgs, WhereUniqueInput> {
  constructor(
    private prisma: PrismaService,
    private readonly modelName: Prisma.ModelName,
  ) {}

  async create(args: CreateArgs): Promise<T> {
    return (this.prisma[this.modelName] as any).create(args);
  }

  async findAll(query: string): Promise<T[]> {
    return (this.prisma[this.modelName] as any).findMany(JSON.parse(query));
  }

  async findOne(where: WhereUniqueInput): Promise<T | null> {
    return (this.prisma[this.modelName] as any).findUnique({ where });
  }

  async update(args: UpdateArgs): Promise<T> {
    return (this.prisma[this.modelName] as any).update(args);
  }

  async remove(where: WhereUniqueInput): Promise<T> {
    return (this.prisma[this.modelName] as any).delete({ where });
  }
}
