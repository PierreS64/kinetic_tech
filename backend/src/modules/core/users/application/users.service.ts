import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/application/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { UserAddress: true },
    });
  }

  async findById(id: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { UserAddress: true },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async upsertAddress(userId: string, address: string) {
    const addresses = await this.prisma.userAddress.findMany({
      where: { userId },
    });
    if (addresses.length > 0) {
      return this.prisma.userAddress.update({
        where: { id: addresses[0].id },
        data: { address },
      });
    } else {
      return this.prisma.userAddress.create({
        data: { userId, address, isDefault: true },
      });
    }
  }

  async findTechnicians() {
    return this.prisma.user.findMany({
      where: { role: 'TECHNICIAN' },
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
