import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, ForbiddenException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Request() req, @Body() dto: CreateOrderDto) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException('Tài khoản quản trị không thể thực hiện chức năng mua hàng.');
    }
    return this.ordersService.createOrder(req.user.id, dto);
  }

  @Get()
  getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.id);
  }

  @Get('all')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Request() req, @Param('id') id: string) {
    return this.ordersService.getOrderById(req.user.id, id);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateOrderStatus(id, body.status);
  }
}

