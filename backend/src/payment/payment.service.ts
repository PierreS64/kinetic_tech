import { Injectable, Logger } from '@nestjs/common';
import { PayOS } from '@payos/node';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  private readonly payos: PayOS;
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly prisma: PrismaService) {
    this.payos = new PayOS({
      clientId: process.env.PAYOS_CLIENT_ID,
      apiKey: process.env.PAYOS_API_KEY,
      checksumKey: process.env.PAYOS_CHECKSUM_KEY,
    });
  }

  async createPaymentLink(orderId: string, amount: number, items: any[]) {
    const DOMAIN = process.env.FRONTEND_URL || 'http://localhost:3000/kinetictech';
    // PayOS requires orderCode to be a number (max 53 bit integer). 
    // We will generate a unique numeric orderCode and save it, or just use a timestamp based one for simplicity.
    const orderCode = Number(String(Date.now()).slice(-6) + Math.floor(Math.random() * 1000));
    
    // In a real app we'd map orderCode to our UUID orderId. We can store orderCode in Transaction.
    await this.prisma.transaction.create({
      data: {
        orderId,
        gatewayTransactionId: String(orderCode),
        amount,
        paymentMethod: 'PAYOS',
        status: 'PENDING'
      }
    });

    const body = {
      orderCode,
      amount,
      description: `Thanh toan don ${orderCode}`,
      items,
      returnUrl: `${DOMAIN}/checkout?status=success`,
      cancelUrl: `${DOMAIN}/checkout?status=cancel`
    };

    try {
      const paymentLinkRes = await this.payos.paymentRequests.create(body);
      return {
        checkoutUrl: paymentLinkRes.checkoutUrl,
        orderCode,
      };
    } catch (error) {
      this.logger.error('Error creating PayOS link', error);
      throw error;
    }
  }

  async verifyWebhook(webhookData: any) {
    try {
      const webhookUrlInfo = await this.payos.webhooks.verify(webhookData);
      this.logger.log(`Webhook verified! OrderCode: ${webhookUrlInfo.orderCode}`);

      if (webhookData.code === '00' || webhookData.success) {
        // Payment success
        const tx = await this.prisma.transaction.findFirst({
          where: { gatewayTransactionId: String(webhookUrlInfo.orderCode) }
        });

        if (tx) {
          await this.prisma.transaction.update({
            where: { id: tx.id },
            data: { status: 'PAID' }
          });
          
          await this.prisma.order.update({
            where: { id: tx.orderId },
            data: { paymentStatus: 'PAID' }
          });
        }
      }
      return { success: true };
    } catch (error) {
      this.logger.error('Webhook verification failed', error);
      throw error;
    }
  }
}
