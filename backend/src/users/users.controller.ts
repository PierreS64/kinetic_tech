import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: any
  ) {
    const updateData: Prisma.UserUpdateInput = {};
    if (body.fullName) updateData.fullName = body.fullName;
    if (body.phone) updateData.phone = body.phone;
    
    // In Prisma schema, address is a separate model (UserAddress).
    // For simplicity, we just update fullName and phone here.
    
    const user = await this.usersService.update(id, updateData);
    const { password, ...result } = user as any;
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body() body: any
  ) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.password) {
      throw new Error('Tài khoản này đăng nhập bằng Google/Facebook, không thể đổi mật khẩu.');
    }

    const isMatch = await bcrypt.compare(body.oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Mật khẩu cũ không chính xác');
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await this.usersService.update(id, { password: hashedPassword });
    return { message: 'Password changed successfully' };
  }
}
