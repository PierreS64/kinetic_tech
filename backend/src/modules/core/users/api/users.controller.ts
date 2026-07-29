import { Controller, Patch, Body, Param, UseGuards, Get, BadRequestException, NotFoundException, Request } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user as any;
    return result;
  }

  @Get('technicians')
  async getTechnicians() {
    return this.usersService.findTechnicians();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateProfile(@Param('id') id: string, @Body() body: any) {
    const updateData: Prisma.UserUpdateInput = {};
    if (body.fullName) updateData.fullName = body.fullName;
    if (body.phone) updateData.phone = body.phone;

    if (body.address) {
      await this.usersService.upsertAddress(id, body.address);
    }

    const user = await this.usersService.update(id, updateData);
    const { password, ...result } = user as any;
    result.address = body.address;
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/password')
  async changePassword(@Param('id') id: string, @Body() body: any) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password) {
      throw new BadRequestException(
        'Tài khoản này đăng nhập bằng Google/Facebook, không thể đổi mật khẩu.',
      );
    }

    const isMatch = await bcrypt.compare(body.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu cũ không chính xác');
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await this.usersService.update(id, { password: hashedPassword });
    return { message: 'Password changed successfully' };
  }
}
