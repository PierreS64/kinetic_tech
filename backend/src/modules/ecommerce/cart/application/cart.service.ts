import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/application/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from './dtos/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        CartItem: {
          include: {
            ProductVariant: {
              include: {
                Product: {
                  include: { ProductImage: { where: { isThumbnail: true } } },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          CartItem: {
            include: {
              ProductVariant: {
                include: { Product: { include: { ProductImage: true } } },
              },
            },
          },
        },
      });
    }
    return cart;
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const cart = await this.getCart(userId);

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: dto.productVariantId },
    });

    if (!variant) throw new NotFoundException('Product variant not found');
    if (variant.stockQuantity < dto.quantity)
      throw new BadRequestException('Not enough stock');

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productVariantId: dto.productVariantId },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + dto.quantity;
      if (variant.stockQuantity < newQuantity)
        throw new BadRequestException('Not enough stock');
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId: dto.productVariantId,
          quantity: dto.quantity,
        },
      });
    }
  }

  async addBulk(userId: string, rawIds: string[]) {
    const cart = await this.getCart(userId);

    const processItem = async (rawId: string) => {
      if (!rawId) return null;

      let variant: any = null;

      // 1. Try finding ProductVariant directly by id if valid UUID
      if (rawId.length >= 30) {
        variant = await this.prisma.productVariant.findUnique({
          where: { id: rawId },
        });

        // 2. If not found, try finding by productId
        if (!variant) {
          variant = await this.prisma.productVariant.findFirst({
            where: { productId: rawId, deletedAt: null },
          });
        }
      }

      // 3. Fallback: try finding product by name match
      if (!variant) {
        variant = await this.prisma.productVariant.findFirst({
          where: {
            deletedAt: null,
            Product: { name: { contains: rawId, mode: 'insensitive' } },
          },
        });
      }

      if (!variant || variant.stockQuantity < 1) return null;

      const existingItem = await this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productVariantId: variant.id },
      });

      if (existingItem) {
        return this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + 1 },
        });
      } else {
        return this.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 1,
          },
        });
      }
    };

    const results = await Promise.all(rawIds.map(processItem));
    const addedCount = results.filter(r => r !== null).length;

    return { success: true, addedCount, cart: await this.getCart(userId) };
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { ProductVariant: true },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    if (item.ProductVariant.stockQuantity < dto.quantity)
      throw new BadRequestException('Not enough stock');

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException('Cart item not found');
    return this.prisma.cartItem.delete({ where: { id: itemId } });
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (cart) {
      return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
    return { count: 0 };
  }
}
