import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

import {
  LoginInput,
  LoginOutput,
  UserPublic,
  ErrorEnvelope,
} from '@shared/schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const parsed = LoginInput.safeParse(body);
    if (!parsed.success) {
      return { statusCode: 400, ...ErrorEnvelope.parse({}) };
    }
    const user = await this.authService.register(
      parsed.data.username,
      parsed.data.password,
    );
    return UserPublic.parse({ id: user.id, username: user.username });
  }

  @Post('login')
  async login(@Body() body: any) {
    const parsed = LoginInput.safeParse(body);
    if (!parsed.success) {
      return { statusCode: 400, ...ErrorEnvelope.parse({}) };
    }
    const user = await this.authService.validateUser(
      parsed.data.username,
      parsed.data.password,
    );
    if (!user) {
      return { statusCode: 400, ...ErrorEnvelope.parse({}) };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return UserPublic.parse({ id: req.user.id, username: req.user.username });
  }
}
