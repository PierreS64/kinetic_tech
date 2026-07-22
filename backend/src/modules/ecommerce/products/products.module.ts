import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './api/products.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { CloudinaryModule } from '../../core/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
