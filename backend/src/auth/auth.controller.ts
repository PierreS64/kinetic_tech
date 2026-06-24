import { Controller, Request, Post, UseGuards, Get, Req, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    // Guards handle redirection
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const result = await this.authService.login(req.user);
    res.redirect(`http://localhost:5173/?token=${result.access_token}&userData=${encodeURIComponent(JSON.stringify(result.user))}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req: any) {
    // Guards handle redirection
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any, @Res() res: any) {
    const result = await this.authService.login(req.user);
    res.redirect(`http://localhost:5173/?token=${result.access_token}&userData=${encodeURIComponent(JSON.stringify(result.user))}`);
  }
}
