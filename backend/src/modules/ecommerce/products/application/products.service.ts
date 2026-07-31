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
      include: {
        ProductImage: true,
        Category: true,
        ProductVariant: true,
        PcComponentSpec: true,
      },
    });
  }

  private parseSpecPayload(dto: any) {
    if (!dto.componentType) return undefined;

    const parseArray = (val: any) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
      return val
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);
    };

    return {
      componentType: dto.componentType,
      socket: dto.socket ? parseArray(dto.socket) : undefined,
      chipset: dto.chipset,
      ramType: dto.ramType,
      ramSpeed: dto.ramSpeed ? parseInt(dto.ramSpeed) : undefined,
      ramModules: dto.ramModules ? parseInt(dto.ramModules) : undefined,
      ramSlots: dto.ramSlots ? parseInt(dto.ramSlots) : undefined,
      ramCapacity: dto.ramCapacity ? parseInt(dto.ramCapacity) : undefined,
      formFactor: dto.formFactor ? parseArray(dto.formFactor) : undefined,
      length: dto.length ? parseInt(dto.length) : undefined,
      maxGpuLength: dto.maxGpuLength ? parseInt(dto.maxGpuLength) : undefined,
      height: dto.height ? parseInt(dto.height) : undefined,
      maxCoolerHeight: dto.maxCoolerHeight
        ? parseInt(dto.maxCoolerHeight)
        : undefined,
      wattage: dto.wattage ? parseInt(dto.wattage) : undefined,
      psuEfficiency: dto.psuEfficiency,
      pcie8Pin: dto.pcie8Pin ? parseInt(dto.pcie8Pin) : undefined,
      pcie12Vhpwr: dto.pcie12Vhpwr ? parseInt(dto.pcie12Vhpwr) : undefined,
      eps8Pin: dto.eps8Pin ? parseInt(dto.eps8Pin) : undefined,
      sataPorts: dto.sataPorts ? parseInt(dto.sataPorts) : undefined,
      m2Slots: dto.m2Slots ? parseInt(dto.m2Slots) : undefined,
      m2FormFactor: dto.m2FormFactor ? parseArray(dto.m2FormFactor) : undefined,
      radiatorSize: dto.radiatorSize ? parseInt(dto.radiatorSize) : undefined,
      supportedRadiators: dto.supportedRadiators
        ? parseArray(dto.supportedRadiators).map((n) => parseInt(n))
        : undefined,
    };
  }

  async createAdminProduct(dto: any, file?: Express.Multer.File) {
    let category = await this.prisma.category.findFirst({
      where: { name: { equals: dto.category, mode: 'insensitive' } },
    });

    if (!category) {
      category = await this.prisma.category.create({
        data: { name: dto.category },
      });
    }

    const description = dto.description || '';
    const pcComponentSpecPayload = this.parseSpecPayload(dto);

    let imageUrl = '';
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      imageUrl = uploadResult.secure_url;
    }

    const newProduct = await this.prisma.product.create({
      data: {
        name: dto.name,
        brand: dto.brand || 'Khác',
        description,
        categoryId: category.id,
        ProductVariant: {
          create: {
            price: parseFloat(dto.price) || 0,
            stockQuantity: dto.inStock === 'false' ? 0 : 100,
          },
        },
        ...(imageUrl
          ? {
              ProductImage: {
                create: {
                  imageUrl,
                  isThumbnail: true,
                },
              },
            }
          : {}),
        ...(pcComponentSpecPayload
          ? {
              PcComponentSpec: {
                create: pcComponentSpecPayload,
              },
            }
          : {}),
      },
      include: {
        ProductImage: true,
        Category: true,
        ProductVariant: true,
        PcComponentSpec: true,
      },
    });

    return newProduct;
  }

  async updateAdminProduct(id: string, dto: any, file?: Express.Multer.File) {
    const product = await this.findOne(id);

    let imageUrl = undefined;
    if (file) {
      const uploadResult = await this.cloudinary.uploadFile(file);
      imageUrl = uploadResult.secure_url;
    }

    let categoryId = product.categoryId;
    if (dto.category) {
      let category = await this.prisma.category.findFirst({
        where: { name: { equals: dto.category, mode: 'insensitive' } },
      });
      if (!category) {
        category = await this.prisma.category.create({
          data: { name: dto.category },
        });
      }
      categoryId = category.id;
    }

    const pcComponentSpecPayload = this.parseSpecPayload(dto);

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.brand ? { brand: dto.brand } : {}),
        ...(dto.description ? { description: dto.description } : {}),
        categoryId,
        ...(imageUrl
          ? {
              ProductImage: {
                create: { imageUrl, isThumbnail: true },
              },
            }
          : {}),
        ...(pcComponentSpecPayload
          ? {
              PcComponentSpec: {
                upsert: {
                  create: pcComponentSpecPayload,
                  update: pcComponentSpecPayload,
                },
              },
            }
          : {}),
      },
      include: {
        ProductImage: true,
        Category: true,
        ProductVariant: true,
        PcComponentSpec: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        Category: true,
        ProductImage: true,
        ProductVariant: true,
        PcComponentSpec: true,
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
        PcComponentSpec: true,
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
      include: {
        ProductImage: true,
        Category: true,
        ProductVariant: true,
        PcComponentSpec: true,
      },
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
