import { Module } from '@nestjs/common';
import { TicketsService } from './application/tickets.service';
import { TicketsController } from './api/tickets.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { CloudinaryModule } from '../../core/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
