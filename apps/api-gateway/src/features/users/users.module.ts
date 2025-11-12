import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: 'http://user-service:3000', // Docker service name for user-service
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // <-- IMPORTANT: For NotificationsModule to use
})
export class UsersModule {}
