import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserDevicesService } from '../application/user-devices.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDeviceDto } from '../application/dtos/user-device.dto';

@Controller('user-devices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() dto: CreateUserDeviceDto) {
    return this.userDevicesService.create(req.user.id, dto);
  }

  @Get('my-devices')
  @UseGuards(AuthGuard('jwt'))
  getMyDevices(@Request() req) {
    return this.userDevicesService.getMyDevices(req.user.id);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  getAllDevices() {
    return this.userDevicesService.getAllDevices();
  }

  // Public route for warranty lookup
  @Get('warranty/:serial')
  checkWarranty(@Param('serial') serial: string) {
    return this.userDevicesService.getDeviceBySerial(serial);
  }
}
