

import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateNotificationDto, CreateUserDto } from './shared';
import { UsersService } from './features/users/users.service';

@Controller('api/v1/') // Sets the base path
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService,  private readonly usersService: UsersService,) {}

  @Post('notifications')
  @HttpCode(202) 
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    
  return this.apiGatewayService.processNotification(createNotificationDto);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
