import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Webhook for PayOS
  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    console.log("Nhận Webhook từ PayOS:", body);
    return await this.paymentService.verifyWebhook(body);
  }
}
