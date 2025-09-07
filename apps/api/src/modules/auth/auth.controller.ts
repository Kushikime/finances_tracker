import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { RegisterUserSchema, UserPublic, LoginInput, ErrorEnvelope } from '@acme/shared';
import type { RegisterUserDto } from '@acme/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() body: RegisterUserDto) {
    const { email, password, name, surname } = body;
    const user = await this.authService.register(
      email,
      password,
      name,
      surname,
    );
    return UserPublic.parse({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginInput))
  async login(@Body() body: typeof LoginInput._type) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return { statusCode: 400, ...ErrorEnvelope.parse({}) };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: { user: typeof UserPublic._type }) {
    return UserPublic.parse({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      surname: req.user.surname,
    });
  }
}
