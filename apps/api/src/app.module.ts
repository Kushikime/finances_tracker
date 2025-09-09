import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { LogHeadersMiddleware } from './common/log-headers.middleware';

@Module({
  imports: [AuthModule, HealthModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogHeadersMiddleware).forRoutes('*');
  }
}
