import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 🔐 Global Validation Pipe
   * - removes unknown fields
   * - blocks invalid data
   * - transforms DTO types
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,      // <<< VERY IMPORTANT
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * 🌍 Enable CORS (for frontend connection)
   * Adjust origin in production
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /**
   * 🚀 Global API prefix
   * Example: /api/auth/login
   */
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}/api`);
}

bootstrap();
