import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TemplateServiceController } from './template-service.controller';
import { Template_service_service } from './template-service.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TemplateServiceController],
  providers: [Template_service_service],
})
export class TemplateServiceModule {}
