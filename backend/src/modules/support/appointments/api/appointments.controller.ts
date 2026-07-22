import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppointmentsService } from '../application/appointments.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateAppointmentDto,
  UpdateAppointmentStatusDto,
} from '../application/dtos/appointment.dto';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.id, dto);
  }

  @Get('my-appointments')
  getMyAppointments(@Request() req) {
    return this.appointmentsService.getMyAppointments(req.user.id);
  }

  @Get()
  getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, dto);
  }
}
