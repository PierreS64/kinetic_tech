import { AppointmentType, AppointmentStatus } from '@prisma/client';

export class CreateAppointmentDto {
  technicianId: string;
  date: string; // ISO Date string
  timeSlot: string; // e.g., '09:00 - 10:00'
  type: AppointmentType;
}

export class UpdateAppointmentStatusDto {
  status: AppointmentStatus;
}
