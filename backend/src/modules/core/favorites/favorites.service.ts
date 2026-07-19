import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(userId: string, dto: CreateFavoriteDto) {
    const existing = await this.prisma.favorite.findFirst({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { message: 'Đã xóa khỏi danh sách yêu thích' };
    } else {
      await this.prisma.favorite.create({
        data: { userId, productId: dto.productId },
      });
      return { message: 'Đã thêm vào danh sách yêu thích' };
    }
  }

  async getMyFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        Product: { include: { ProductImage: true, ProductVariant: true } },
      },
    });
  }
}
