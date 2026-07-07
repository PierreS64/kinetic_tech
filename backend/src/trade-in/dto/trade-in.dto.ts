import { TradeInStatus } from '@prisma/client';

export class CreateTradeInDto {
  deviceName: string;
  condition: string;
}

export class UpdateTradeInStatusDto {
  status: TradeInStatus;
  estimatedValue?: number;
}
