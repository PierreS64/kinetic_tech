import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class WarrantiesService {
  constructor(private prisma: PrismaService) {}

  async getAllWarranties() {
    return this.prisma.ticket.findMany({
      where: {
        userDeviceId: {
          not: null,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        User_Ticket_customerIdToUser: {
          select: { id: true, fullName: true, email: true, phoneNumber: true },
        },
        UserDevice: {
          include: {
            Product: true,
          },
        },
      },
    });
  }

  async getCustomerWarranties(customerId: string) {
    return this.prisma.ticket.findMany({
      where: {
        customerId,
        userDeviceId: {
          not: null,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        UserDevice: {
          include: {
            Product: true,
          },
        },
      },
    });
  }
}
