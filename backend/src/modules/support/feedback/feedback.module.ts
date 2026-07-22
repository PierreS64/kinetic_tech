import { Module } from '@nestjs/common';
import { FeedbackService } from './application/feedback.service';
import { FeedbackController } from './api/feedback.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
