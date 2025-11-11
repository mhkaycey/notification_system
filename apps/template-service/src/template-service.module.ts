import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { template_service_controller } from './template-service.controller';
import { template_service_service } from './template-service.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [template_service_controller],
  providers: [template_service_service],
})
export class template_service_module {}
