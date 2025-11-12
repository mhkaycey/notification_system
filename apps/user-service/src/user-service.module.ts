import { Module } from '@nestjs/common';
import { UsersController } from './user-service.controller';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
