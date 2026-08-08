import { IsInt, IsNotEmpty, IsString, Min, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @IsNotEmpty()
  productVariantId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;
}

export class AddBulkCartDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  items?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productVariantIds?: string[];
}
