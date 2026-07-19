import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CloudinaryService } from '../../core/cloudinary/cloudinary.service';
import { CreateTicketDto, UpdateTicketStatusDto } from './dto/ticket.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async createTicket(
    customerId: string,
    dto: CreateTicketDto,
    files?: Express.Multer.File[],
  ) {
    const imageUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadResult = await this.cloudinary.uploadFile(file);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    return this.prisma.ticket.create({
      data: {
        customerId,
        description: dto.description,
        userDeviceId: dto.userDeviceId,
        severity: dto.severity || 'LOW',
        imageUrls,
      },
    });
  }

  async getCustomerTickets(customerId: string) {
    return this.prisma.ticket.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: { UserDevice: { include: { Product: true } } },
    });
  }

  async getAllTickets() {
    return this.prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        User_Ticket_customerIdToUser: {
          select: { id: true, fullName: true, email: true },
        },
        User_Ticket_technicianIdToUser: {
          select: { id: true, fullName: true },
        },
      },
    });
  }

  async getTicketById(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        User_Ticket_customerIdToUser: {
          select: { id: true, fullName: true, email: true, phoneNumber: true },
        },
        UserDevice: { include: { Product: true } },
      },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async updateTicketStatus(id: string, dto: UpdateTicketStatusDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: {
        status: dto.status,
        technicianId: dto.technicianId,
        updatedAt: new Date(),
      },
    });
  }
  async trackRepair(id: string) {
    let ticketId = id;
    if (id.startsWith('REP-')) {
      ticketId = id.replace('REP-', '');
    } else if (id.startsWith('KT-')) {
      ticketId = id.replace('KT-', '');
    }

    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id: ticketId },
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          description: true,
          severity: true,
          UserDevice: {
            select: {
              serialNumber: true,
              Product: {
                select: { name: true },
              },
            },
          },
        },
      });
      if (!ticket)
        throw new NotFoundException('Không tìm thấy thông tin sửa chữa');
      return ticket;
    } catch (e) {
      throw new NotFoundException('Không tìm thấy thông tin sửa chữa');
    }
  }
}
