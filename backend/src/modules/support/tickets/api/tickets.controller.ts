import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  ForbiddenException,
} from '@nestjs/common';
import { TicketsService } from '../application/tickets.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateTicketDto,
  UpdateTicketStatusDto,
} from '../application/dtos/ticket.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('images', 5)) // Max 5 images
  create(
    @Request() req,
    @Body() dto: CreateTicketDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException(
        'Tài khoản quản trị không thể gửi yêu cầu hỗ trợ/bảo hành.',
      );
    }
    return this.ticketsService.createTicket(req.user.id, dto, files);
  }

  @Get('my-tickets')
  @UseGuards(AuthGuard('jwt'))
  getMyTickets(@Request() req) {
    return this.ticketsService.getCustomerTickets(req.user.id);
  }

  // Admin / Technician route
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  // Public route for tracking repair
  @Get('track/:id')
  trackRepair(@Param('id') id: string) {
    return this.ticketsService.trackRepair(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTicketStatusDto) {
    return this.ticketsService.updateTicketStatus(id, dto);
  }
}
