import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { deletedAt: null },
      include: {
        _count: {
          select: { Product: true }
        }
      }
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, deletedAt: null }
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    // Soft delete
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
