import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/application/prisma.service';
import { CreateUserDeviceDto } from './dtos/user-device.dto';

@Injectable()
export class UserDevicesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateUserDeviceDto) {
    const existing = await this.prisma.userDevice.findUnique({
      where: { serialNumber: dto.serialNumber },
    });
    if (existing) {
      throw new BadRequestException('Serial Number already registered');
    }

    return this.prisma.userDevice.create({
      data: {
        userId,
        productId: dto.productId,
        serialNumber: dto.serialNumber,
        purchaseDate: new Date(dto.purchaseDate),
        warrantyExpiryDate: new Date(dto.warrantyExpiryDate),
      },
    });
  }

  async getMyDevices(userId: string) {
    return this.prisma.userDevice.findMany({
      where: { userId },
      include: { Product: true },
    });
  }

  async getDeviceBySerial(serialNumber: string) {
    const device = await this.prisma.userDevice.findUnique({
      where: { serialNumber },
      include: {
        Product: true,
        User: { select: { id: true, fullName: true } },
      },
    });
    if (!device)
      throw new NotFoundException(
        'Thiết bị không tồn tại hoặc Serial không đúng',
      );
    return device;
  }

  async getAllDevices() {
    return this.prisma.userDevice.findMany({
      include: {
        Product: true,
        User: { select: { fullName: true, email: true, phone: true } },
      },
      orderBy: { purchaseDate: 'desc' },
    });
  }
}
