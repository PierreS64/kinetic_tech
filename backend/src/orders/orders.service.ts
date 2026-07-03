import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        CartItem: {
          include: { ProductVariant: { include: { Product: true } } },
        },
      },
    });

    if (!cart || cart.CartItem.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let totalAmount = 0;
    const orderItemsData: any[] = [];
    const payosItems: any[] = [];

    for (const item of cart.CartItem) {
      if (item.ProductVariant.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for variant ${item.ProductVariant.id}`,
        );
      }
      totalAmount += item.ProductVariant.price * item.quantity;
      orderItemsData.push({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        price: item.ProductVariant.price,
      });
      payosItems.push({
        name: item.ProductVariant.Product.name.substring(0, 50),
        quantity: item.quantity,
        price: item.ProductVariant.price,
      });
    }

    // Wrap in transaction: create order, create items, reduce stock, clear cart
    const order = await this.prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          userAddressId: dto.userAddressId,
          shippingAddress: dto.shippingAddress,
          couponId: dto.couponId,
          totalAmount,
          paymentMethod: dto.paymentMethod,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          OrderItem: {
            create: orderItemsData,
          },
        },
        include: { OrderItem: true },
      });

      // Reduce stock
      for (const item of cart.CartItem) {
        await prisma.productVariant.update({
          where: { id: item.productVariantId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }

      // Clear cart items
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    if (dto.paymentMethod === 'PAYOS') {
      const paymentRes = await this.paymentService.createPaymentLink(
        order.id,
        totalAmount,
        payosItems,
      );
      return { ...order, checkoutUrl: paymentRes.checkoutUrl };
    }

    return order;
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        OrderItem: {
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
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: {
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

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
