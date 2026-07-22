import { Module } from '@nestjs/common';
import { UserDevicesService } from './application/user-devices.service';
import { UserDevicesController } from './api/user-devices.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserDevicesController],
  providers: [UserDevicesService],
  exports: [UserDevicesService],
})
export class UserDevicesModule {}
