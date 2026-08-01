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

    let v0: any = dto;
    if (dto.variants) {
      try {
        const parsed = JSON.parse(dto.variants);
        if (parsed && parsed.length > 0) v0 = parsed[0];
      } catch (e) {}
    }

    const parseArray = (val: any) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
      return val
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s);
    };

    return {
      componentType: dto.componentType,
      socket: v0.socket ? parseArray(v0.socket) : undefined,
      chipset: v0.chipset,
      ramType: v0.ramType,
      ramSpeed: v0.ramSpeed ? parseInt(v0.ramSpeed) : undefined,
      ramModules: v0.ramModules ? parseInt(v0.ramModules) : undefined,
      ramSlots: v0.ramSlots ? parseInt(v0.ramSlots) : undefined,
      ramCapacity: v0.ramCapacity ? parseInt(v0.ramCapacity) : undefined,
      formFactor: v0.formFactor ? parseArray(v0.formFactor) : undefined,
      length: v0.length ? parseInt(v0.length) : undefined,
      maxGpuLength: v0.maxGpuLength ? parseInt(v0.maxGpuLength) : undefined,
      height: v0.height ? parseInt(v0.height) : undefined,
      maxCoolerHeight: v0.maxCoolerHeight
        ? parseInt(v0.maxCoolerHeight)
        : undefined,
      wattage: v0.wattage ? parseInt(v0.wattage) : undefined,
      psuEfficiency: v0.psuEfficiency,
      pcie8Pin: v0.pcie8Pin ? parseInt(v0.pcie8Pin) : undefined,
      pcie12Vhpwr: v0.pcie12Vhpwr ? parseInt(v0.pcie12Vhpwr) : undefined,
      eps8Pin: v0.eps8Pin ? parseInt(v0.eps8Pin) : undefined,
      sataPorts: v0.sataPorts ? parseInt(v0.sataPorts) : undefined,
      m2Slots: v0.m2Slots ? parseInt(v0.m2Slots) : undefined,
      m2FormFactor: v0.m2FormFactor ? parseArray(v0.m2FormFactor) : undefined,
      radiatorSize: v0.radiatorSize ? parseInt(v0.radiatorSize) : undefined,
      supportedRadiators: v0.supportedRadiators
        ? parseArray(v0.supportedRadiators).map((n: string) => parseInt(n))
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

    let parsedVariants: any[] = [];
    if (dto.variants) {
      try {
        parsedVariants = JSON.parse(dto.variants);
      } catch (e) {}
    }
    
    // Default fallback if no variants provided
    if (parsedVariants.length === 0) {
      parsedVariants.push({ price: parseFloat(dto.price) || 0, stockQuantity: dto.inStock === 'false' ? 0 : 100 });
    }

    // Save specs in description for legacy frontend support (using first variant)
    const firstVar = parsedVariants[0];
    const { id, price, stockQuantity, color, ...specs } = firstVar;
    // Clean up empty specs
    const cleanSpecs = Object.fromEntries(Object.entries(specs).filter(([_, v]) => v !== '' && v !== undefined && v !== null));
    const description = dto.description || (Object.keys(cleanSpecs).length > 0 ? JSON.stringify(cleanSpecs) : '');

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
          createMany: {
            data: parsedVariants.map(v => ({
              price: parseFloat(v.price) || 0,
              stockQuantity: parseInt(v.stockQuantity) || 0,
              color: v.color || null
            }))
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

    let parsedVariants: any[] = [];
    if (dto.variants) {
      try { parsedVariants = JSON.parse(dto.variants); } catch (e) {}
    }

    let description = dto.description;
    if (parsedVariants.length > 0) {
      const firstVar = parsedVariants[0];
      const { id: vId, price, stockQuantity, color, ...specs } = firstVar;
      const cleanSpecs = Object.fromEntries(Object.entries(specs).filter(([_, v]) => v !== '' && v !== undefined && v !== null));
      if (Object.keys(cleanSpecs).length > 0) {
        description = JSON.stringify(cleanSpecs);
      }
    }

    const pcComponentSpecPayload = this.parseSpecPayload(dto);

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.brand ? { brand: dto.brand } : {}),
        ...(description ? { description } : {}),
        categoryId,
        ...(parsedVariants.length > 0
          ? {
              ProductVariant: {
                deleteMany: {},
                createMany: {
                  data: parsedVariants.map(v => ({
                    price: parseFloat(v.price) || 0,
                    stockQuantity: parseInt(v.stockQuantity) || 0,
                    color: v.color || null
                  }))
                }
              }
            }
          : {}),
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
