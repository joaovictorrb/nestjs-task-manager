import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adding validation
  // --
  app.useGlobalPipes(new ValidationPipe());
  // --
  // adding Interceptor
  // reduces the amount of info
  app.useGlobalInterceptors(new TransformInterceptor)
  // --
  await app.listen(3000);
}
bootstrap();
