import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, dto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        customerId,
        technicianId: dto.technicianId,
        date: new Date(dto.date),
        timeSlot: dto.timeSlot,
        type: dto.type,
      }
    });
  }

  async getMyAppointments(customerId: string) {
    return this.prisma.appointment.findMany({
      where: { customerId },
      orderBy: { date: 'asc' },
      include: {
        User_Appointment_technicianIdToUser: { select: { id: true, fullName: true, phone: true } }
      }
    });
  }

  async getAllAppointments() {
    return this.prisma.appointment.findMany({
      orderBy: { date: 'asc' },
      include: {
        User_Appointment_customerIdToUser: { select: { id: true, fullName: true, phone: true } },
        User_Appointment_technicianIdToUser: { select: { id: true, fullName: true, phone: true } }
      }
    });
  }

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status: dto.status }
    });
  }
}
