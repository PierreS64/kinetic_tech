import { Module } from '@nestjs/common';
import { CloudinaryService } from './application/cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
