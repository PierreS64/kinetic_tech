import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BannersService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(linkUrl: string, file: Express.Multer.File) {
    const uploadResult = await this.cloudinary.uploadFile(file);
    return this.prisma.banner.create({
      data: {
        imageUrl: uploadResult.secure_url,
        linkUrl,
      },
    });
  }

  async findAllActive() {
    return this.prisma.banner.findMany({
      where: { isActive: true },
    });
  }

  async remove(id: string) {
    return this.prisma.banner.update({ 
      where: { id },
      data: { isActive: false }
    });
  }
}
