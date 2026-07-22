import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { WarrantiesService } from '../application/warranties.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('warranties')
@UseGuards(AuthGuard('jwt'))
export class WarrantiesController {
  constructor(private readonly warrantiesService: WarrantiesService) {}

  @Get()
  getAllWarranties() {
    return this.warrantiesService.getAllWarranties();
  }

  @Get('my-warranties')
  getMyWarranties(@Request() req) {
    return this.warrantiesService.getCustomerWarranties(req.user.id);
  }
}
