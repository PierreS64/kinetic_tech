import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from '../application/cart.service';
import { AuthGuard } from '@nestjs/passport';
import {
  AddCartItemDto,
  UpdateCartItemDto,
  AddBulkCartDto,
} from '../application/dtos/cart.dto';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  addItem(@Request() req, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req.user.id, dto);
  }

  @Post('add-bulk')
  addBulk(@Request() req, @Body() dto: AddBulkCartDto) {
    const rawIds = dto.items || dto.productVariantIds || [];
    return this.cartService.addBulk(req.user.id, rawIds);
  }

  @Post('bulk-add')
  bulkAdd(@Request() req, @Body() dto: AddBulkCartDto) {
    const rawIds = dto.items || dto.productVariantIds || [];
    return this.cartService.addBulk(req.user.id, rawIds);
  }

  @Patch('items/:itemId')
  updateItem(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(req.user.id, itemId, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Request() req, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(req.user.id, itemId);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
