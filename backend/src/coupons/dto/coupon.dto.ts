import { CouponType } from '@prisma/client';

export class CreateCouponDto {
  code: string;
  type: CouponType;
  discountAmount?: number;
  discountPercentage?: number;
  validFrom: string;
  validUntil: string;
  productIds?: string[];
}
