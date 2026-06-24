import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, AuthProvider } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    };
  }

  async validateOAuthLogin(profile: any, provider: AuthProvider) {
    try {
      let user = await this.usersService.findByEmail(profile.emails[0].value);
      
      if (!user) {
        user = await this.usersService.create({
          email: profile.emails[0].value,
          fullName: profile.displayName || 'OAuth User',
          provider: provider,
          providerId: profile.id,
        });
      }
      
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async register(data: any) {
    const { email, password, fullName, phone } = data;
    
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('Mật khẩu phải từ 6-20 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      fullName,
      phone,
      provider: AuthProvider.LOCAL,
    });
    
    const { password: _, ...result } = user as any;
    return result;
  }
}
