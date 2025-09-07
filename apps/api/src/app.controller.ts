import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from NestJS API!';
  }

  @Get('health')
  health(): { status: string } {
    return { status: 'ok' };
  }
}
