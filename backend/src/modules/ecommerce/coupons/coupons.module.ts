import { Module } from '@nestjs/common';
import { CouponsService } from './application/coupons.service';
import { CouponsController } from './api/coupons.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
