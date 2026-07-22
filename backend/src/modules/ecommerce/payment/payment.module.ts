import { Module } from '@nestjs/common';
import { PaymentService } from './application/payment.service';
import { PaymentController } from './api/payment.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
