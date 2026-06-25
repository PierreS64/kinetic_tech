import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async create(data: Prisma.ProductCreateInput, file?: Express.Multer.File) {
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      data.ProductImage = {
        create: {
          imageUrl: uploadResult.secure_url,
          isThumbnail: true
        }
      };
    }
    return this.prisma.product.create({ 
      data,
      include: { ProductImage: true, Category: true, ProductVariant: true }
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        Category: true,
        ProductImage: true,
        ProductVariant: true
      }
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        Category: true,
        ProductImage: true,
        ProductVariant: true
      }
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput, file?: Express.Multer.File) {
    await this.findOne(id);
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      data.ProductImage = {
        create: {
          imageUrl: uploadResult.secure_url,
          isThumbnail: true
        }
      };
    }
    return this.prisma.product.update({
      where: { id },
      data,
      include: { ProductImage: true, Category: true, ProductVariant: true }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
