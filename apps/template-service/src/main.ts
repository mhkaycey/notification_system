import { NestFactory } from '@nestjs/core';
import { TemplateServiceModule } from './template-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TemplateServiceModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.port ?? 8000);
}
bootstrap().catch((err) => {
  console.error('Application bootstrap failed:', err);
  process.exit(1);
});
