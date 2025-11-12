import { NestFactory } from '@nestjs/core';
import { email_service_module } from './email-service.module';

async function bootstrap() {
  const app = await NestFactory.create(email_service_module);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
