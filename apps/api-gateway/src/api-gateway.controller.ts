import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateNotificationDto } from './shared'; // Assuming from shared
import { post } from 'axios';
import { CreateUserDto } from '../../user-service/src/users/dto/create-user.dto';
import { UsersService } from './features/users/users.service';
@Controller('api/v1/') // <-- Base path for notifications
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly usersService: UsersService,
  ) {}

  @Post('notifications')
  @HttpCode(202) // "Accepted"
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    // The ValidationPipe handles validation
    return this.apiGatewayService.processNotification(createNotificationDto);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
