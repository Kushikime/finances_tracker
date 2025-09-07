import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// ConfigModule: Loads and provides environment variables, including DB config
@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true })],
})
export class ConfigModule {}
