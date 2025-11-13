import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // Show Errors
  process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 UNHANDLED REJECTION! 🚨');
    console.error('Reason:', reason);
    console.error('Promise:', promise);
    if (reason instanceof Error) {
      console.error('Stack:', reason.stack);
    } else {
      console.error('Raw reason:', JSON.stringify(reason, null, 2));
    }
  });

  process.on('uncaughtException', (error) => {
    console.error('🚨 UNCAUGHT EXCEPTION! 🚨', error);
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('User management and preferences for notification system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`User Service running on port ${port}`);
}

void bootstrap();
