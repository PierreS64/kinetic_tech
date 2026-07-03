import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto';

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
                  include: { ProductImage: { where: { isThumbnail: true } } }
                }
              }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { CartItem: { include: { ProductVariant: { include: { Product: { include: { ProductImage: true } } } } } } }
      });
    }
    return cart;
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const cart = await this.getCart(userId);

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: dto.productVariantId }
    });

    if (!variant) throw new NotFoundException('Product variant not found');
    if (variant.stockQuantity < dto.quantity) throw new BadRequestException('Not enough stock');

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productVariantId: dto.productVariantId }
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + dto.quantity;
      if (variant.stockQuantity < newQuantity) throw new BadRequestException('Not enough stock');
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId: dto.productVariantId,
          quantity: dto.quantity
        }
      });
    }
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId }, include: { ProductVariant: true } });
    if (!item) throw new NotFoundException('Cart item not found');

    if (item.ProductVariant.stockQuantity < dto.quantity) throw new BadRequestException('Not enough stock');

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity }
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
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
