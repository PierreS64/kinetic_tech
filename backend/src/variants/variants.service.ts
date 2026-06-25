import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductVariantCreateInput) {
    return this.prisma.productVariant.create({ data });
  }

  async findAll() {
    return this.prisma.productVariant.findMany({
      where: { deletedAt: null }
    });
  }

  async findOne(id: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id, deletedAt: null }
    });
    if (!variant) throw new NotFoundException('Variant not found');
    return variant;
  }

  async update(id: string, data: Prisma.ProductVariantUpdateInput) {
    await this.findOne(id);
    return this.prisma.productVariant.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.productVariant.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
