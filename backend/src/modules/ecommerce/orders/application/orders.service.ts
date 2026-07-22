import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/application/prisma.service';
import { CreateOrderDto } from './dtos/order.dto';
import { PaymentService } from '../../payment/application/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    let cartItemsToProcess: any[] = [];
    let cart: any = null;
    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        let variant;
        if (item.productVariantId) {
          variant = await this.prisma.productVariant.findUnique({
            where: { id: item.productVariantId },
            include: { Product: true },
          });
        } else {
          variant = await this.prisma.productVariant.findFirst({
            where: { productId: item.productId },
            include: { Product: true },
          });
        }
        if (!variant)
          throw new BadRequestException(
            `Variant not found for product ${item.productId}`,
          );
        cartItemsToProcess.push({
          productVariantId: variant.id,
          quantity: item.quantity,
          ProductVariant: variant,
        });
      }
    } else {
      cart = await this.prisma.cart.findUnique({
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
      cartItemsToProcess = cart.CartItem;
    }

    let subtotal = 0;
    const orderItemsData: any[] = [];
    const payosItems: any[] = [];

    for (const item of cartItemsToProcess) {
      if (item.ProductVariant.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for variant ${item.ProductVariant.id}`,
        );
      }
      subtotal += item.ProductVariant.price * item.quantity;
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

    let shippingCost = 45000;
    let discountAmount = 0;

    if (dto.couponId) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { id: dto.couponId },
      });
      if (coupon) {
        if (coupon.code === 'FREESHIP') {
          shippingCost = 0;
        } else if (coupon.discountPercentage) {
          discountAmount = (subtotal * coupon.discountPercentage) / 100;
        } else if (coupon.discountAmount) {
          discountAmount = coupon.discountAmount;
        }
      }
    }
    if (subtotal > 15000000) {
      shippingCost = 0;
    }

    const vatTax = subtotal * 0.08;
    const totalAmount = Math.round(
      subtotal + vatTax + shippingCost - discountAmount,
    );

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
      for (const item of cartItemsToProcess) {
        await prisma.productVariant.update({
          where: { id: item.productVariantId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }

      // Clear cart items if using cart
      if (cart) {
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

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

  async getAllOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        User: { select: { fullName: true, email: true, phone: true } },
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

  async updateOrderStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
    });
  }
}
