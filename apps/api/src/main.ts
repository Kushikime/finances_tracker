import './env-setup';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'development';
  await app.listen(port);
  console.log(`API running on http://localhost:${port} [${env}]`);
}
bootstrap();
