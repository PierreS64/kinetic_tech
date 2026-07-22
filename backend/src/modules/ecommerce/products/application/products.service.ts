import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/application/prisma.service';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from '../../../core/cloudinary/application/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(data: Prisma.ProductCreateInput, file?: Express.Multer.File) {
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      data.ProductImage = {
        create: {
          imageUrl: uploadResult.secure_url,
          isThumbnail: true,
        },
      };
    }
    return this.prisma.product.create({
      data,
      include: { ProductImage: true, Category: true, ProductVariant: true },
    });
  }

  async createAdminProduct(dto: any, file?: Express.Multer.File) {
    // Find or create category
    let category = await this.prisma.category.findFirst({
      where: { name: { equals: dto.category, mode: 'insensitive' } },
    });

    if (!category) {
      category = await this.prisma.category.create({
        data: { name: dto.category },
      });
    }

    const description = JSON.stringify({
      cpu: dto.cpu || 'N/A',
      ram: dto.ram || 'N/A',
      storage: dto.storage || 'N/A',
      gpu: dto.gpu || 'N/A',
      tags: dto.tags || '',
    });

    let imageUrl = '';
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      imageUrl = uploadResult.secure_url;
    }

    const newProduct = await this.prisma.product.create({
      data: {
        name: dto.name,
        brand: 'Khác',
        description,
        categoryId: category.id,
        ProductVariant: {
          create: {
            price: parseFloat(dto.price) || 0,
            stockQuantity: dto.inStock === 'false' ? 0 : 100,
          },
        },
        ...(imageUrl && {
          ProductImage: {
            create: {
              imageUrl,
              isThumbnail: true,
            },
          },
        }),
      },
      include: { ProductImage: true, Category: true, ProductVariant: true },
    });

    return newProduct;
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        Category: true,
        ProductImage: true,
        ProductVariant: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        Category: true,
        ProductImage: true,
        ProductVariant: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: string,
    data: Prisma.ProductUpdateInput,
    file?: Express.Multer.File,
  ) {
    await this.findOne(id);
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      data.ProductImage = {
        create: {
          imageUrl: uploadResult.secure_url,
          isThumbnail: true,
        },
      };
    }
    return this.prisma.product.update({
      where: { id },
      data,
      include: { ProductImage: true, Category: true, ProductVariant: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
