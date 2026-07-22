import { Module } from '@nestjs/common';
import { ReviewsService } from './application/reviews.service';
import { ReviewsController } from './api/reviews.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { CloudinaryModule } from '../../core/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
