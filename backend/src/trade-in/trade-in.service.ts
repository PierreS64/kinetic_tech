import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTradeInDto, UpdateTradeInStatusDto } from './dto/trade-in.dto';

@Injectable()
export class TradeInService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTradeInDto) {
    return this.prisma.tradeIn.create({
      data: {
        userId,
        deviceName: dto.deviceName,
        condition: dto.condition,
      }
    });
  }

  async getMyTradeIns(userId: string) {
    return this.prisma.tradeIn.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllTradeIns() {
    return this.prisma.tradeIn.findMany({
      orderBy: { createdAt: 'desc' },
      include: { User: { select: { id: true, fullName: true, email: true, phoneNumber: true } } }
    });
  }

  async getTradeInById(id: string) {
    const tradeIn = await this.prisma.tradeIn.findUnique({
      where: { id },
      include: { User: { select: { id: true, fullName: true, email: true, phoneNumber: true } } }
    });
    if (!tradeIn) throw new NotFoundException('Yêu cầu thu cũ đổi mới không tồn tại');
    return tradeIn;
  }

  async updateStatus(id: string, dto: UpdateTradeInStatusDto) {
    return this.prisma.tradeIn.update({
      where: { id },
      data: {
        status: dto.status,
        estimatedValue: dto.estimatedValue !== undefined ? dto.estimatedValue : undefined,
      }
    });
  }
}
