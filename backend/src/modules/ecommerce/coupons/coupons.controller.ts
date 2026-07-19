import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() dto: CreateCouponDto) {
    return this.couponsService.create(dto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get('apply/:code')
  applyCoupon(@Param('code') code: string) {
    return this.couponsService.applyCoupon(code);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }

  @Post(':id/products')
  addProduct(@Param('id') id: string, @Body() body: { productId: string }) {
    return this.couponsService.addProduct(id, body.productId);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.couponsService.removeProduct(id, productId);
  }

  @Delete(':id/products')
  removeAllProducts(@Param('id') id: string) {
    return this.couponsService.removeAllProducts(id);
  }
}
