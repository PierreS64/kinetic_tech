import { Controller, Get, UseGuards } from '@nestjs/common';
import { WarrantiesService } from './warranties.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('warranties')
@UseGuards(AuthGuard('jwt'))
export class WarrantiesController {
  constructor(private readonly warrantiesService: WarrantiesService) {}

  @Get()
  getAllWarranties() {
    return this.warrantiesService.getAllWarranties();
  }
}
