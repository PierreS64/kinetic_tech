import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async create(userId: string, dto: CreateReviewDto, files?: Express.Multer.File[]) {
    // Validate if the user actually ordered this product
    const hasPurchased = await this.prisma.orderItem.findFirst({
      where: {
        Order: { userId, status: 'DELIVERED' },
        ProductVariant: { productId: dto.productId }
      }
    });

    if (!hasPurchased) {
      throw new BadRequestException('Bạn chỉ có thể đánh giá sản phẩm sau khi mua và nhận hàng thành công.');
    }

    let imageUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadResult = await this.cloudinary.uploadFile(file);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    return this.prisma.review.create({
      data: {
        userId,
        productId: dto.productId,
        rating: Number(dto.rating),
        comment: dto.comment,
        imageUrls,
      }
    });
  }

  async getProductReviews(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        User: { select: { id: true, fullName: true } }
      }
    });
  }
}
