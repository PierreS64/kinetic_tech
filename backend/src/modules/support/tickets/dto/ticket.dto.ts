import { Severity, TicketStatus } from '@prisma/client';

export class CreateTicketDto {
  description: string;
  userDeviceId?: string;
  severity?: Severity;
}

export class UpdateTicketStatusDto {
  status: TicketStatus;
  technicianId?: string;
}
