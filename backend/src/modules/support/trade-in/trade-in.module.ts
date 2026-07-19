import { Module } from '@nestjs/common';
import { TradeInService } from './trade-in.service';
import { TradeInController } from './trade-in.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TradeInController],
  providers: [TradeInService],
})
export class TradeInModule {}
