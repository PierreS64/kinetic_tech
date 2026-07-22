import { Module } from '@nestjs/common';
import { CategoriesService } from './application/categories.service';
import { CategoriesController } from './api/categories.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
