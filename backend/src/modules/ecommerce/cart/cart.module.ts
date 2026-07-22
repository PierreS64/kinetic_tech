import { Module } from '@nestjs/common';
import { CartService } from './application/cart.service';
import { CartController } from './api/cart.controller';

@Module({
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
