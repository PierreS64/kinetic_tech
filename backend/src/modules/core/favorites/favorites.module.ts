import { Module } from '@nestjs/common';
import { FavoritesService } from './application/favorites.service';
import { FavoritesController } from './api/favorites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
