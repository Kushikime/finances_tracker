import { Controller, Get } from '@nestjs/common';
import { query } from '../../db/query';

@Controller('health')
export class HealthController {
  @Get('db')
  async dbHealth() {
    const result = await query<{ now: string }>('select now()');
    return { status: 'ok', now: result.rows[0].now };
  }
}
