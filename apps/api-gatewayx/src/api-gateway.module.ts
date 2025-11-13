// import { Module } from '@nestjs/common';
// import { ApiGatewayController } from './api-gateway.controller';
// import { ApiGatewayService } from './api-gateway.service';

// @Module({
//   imports: [],
//   controllers: [ApiGatewayController],
//   providers: [ApiGatewayService],
// })
// export class ApiGatewayModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Good to add for env vars
import { NotificationsModule } from './features/notifications/notifications.module';
import { UsersModule } from './features/users/users.module';
// Note: We don't import QueueModule here,
// as it's already imported and used by NotificationsModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // For .env file handling
    NotificationsModule,
    UsersModule,
    // Add TemplateModule proxy here later...
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
