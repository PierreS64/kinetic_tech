import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { TradeInService } from '../application/trade-in.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTradeInDto, UpdateTradeInStatusDto } from '../application/dtos/trade-in.dto';

@Controller('trade-in')
@UseGuards(AuthGuard('jwt'))
export class TradeInController {
  constructor(private readonly tradeInService: TradeInService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateTradeInDto) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException(
        'Tài khoản quản trị không thể tạo yêu cầu thu cũ đổi mới.',
      );
    }
    return this.tradeInService.create(req.user.id, dto);
  }

  @Get('my-requests')
  getMyTradeIns(@Request() req) {
    return this.tradeInService.getMyTradeIns(req.user.id);
  }

  @Get()
  getAllTradeIns() {
    return this.tradeInService.getAllTradeIns();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeInService.getTradeInById(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTradeInStatusDto) {
    return this.tradeInService.updateStatus(id, dto);
  }
}
