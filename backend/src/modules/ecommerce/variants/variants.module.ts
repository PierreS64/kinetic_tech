import { Module } from '@nestjs/common';
import { VariantsService } from './application/variants.service';
import { VariantsController } from './api/variants.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
