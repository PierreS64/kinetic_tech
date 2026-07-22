import { Module } from '@nestjs/common';
import { WarrantiesService } from './application/warranties.service';
import { WarrantiesController } from './api/warranties.controller';

import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WarrantiesController],
  providers: [WarrantiesService],
  exports: [WarrantiesService],
})
export class WarrantiesModule {}
