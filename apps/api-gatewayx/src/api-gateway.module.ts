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
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // For .env file handling
    NotificationsModule,
    UsersModule,

  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
