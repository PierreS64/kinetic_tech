import { Module } from '@nestjs/common';
import { AppointmentsService } from './application/appointments.service';
import { AppointmentsController } from './api/appointments.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
