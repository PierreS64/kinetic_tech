import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateCouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCouponDto) {
    const coupon = await this.prisma.coupon.create({
      data: {
        code: dto.code.toUpperCase(),
        type: dto.type,
        discountAmount: dto.discountAmount,
        discountPercentage: dto.discountPercentage,
        validFrom: new Date(dto.validFrom),
        validUntil: new Date(dto.validUntil),
        isActive: true,
      },
    });

    if (dto.productIds && dto.productIds.length > 0) {
      const couponProducts = dto.productIds.map((pid) => ({
        couponId: coupon.id,
        productId: pid,
      }));
      await this.prisma.couponProduct.createMany({ data: couponProducts });
    }

    return coupon;
  }

  async findAll() {
    return this.prisma.coupon.findMany({
      where: { deletedAt: null },
      include: { CouponProduct: { include: { Product: true } } },
    });
  }

  async applyCoupon(code: string) {
    const coupon = await this.prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        deletedAt: null,
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
    });
    if (!coupon)
      throw new NotFoundException('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    return coupon;
  }

  async remove(id: string) {
    return this.prisma.coupon.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async addProduct(id: string, productId: string) {
    const existing = await this.prisma.couponProduct.findFirst({
      where: { couponId: id, productId },
    });
    if (!existing) {
      await this.prisma.couponProduct.create({
        data: { couponId: id, productId },
      });
    }
    return { success: true };
  }

  async removeProduct(id: string, productId: string) {
    await this.prisma.couponProduct.deleteMany({
      where: { couponId: id, productId },
    });
    return { success: true };
  }

  async removeAllProducts(id: string) {
    await this.prisma.couponProduct.deleteMany({
      where: { couponId: id },
    });
    return { success: true };
  }
}
