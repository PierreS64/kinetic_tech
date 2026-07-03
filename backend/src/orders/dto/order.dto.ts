import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  userAddressId?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  couponId?: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
