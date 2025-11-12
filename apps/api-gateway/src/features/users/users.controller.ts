import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../shared/dto/create-user.dto';

@Controller('api/v1/users') // Public-facing path
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // Just validates and passes the request to the adapter
    return this.usersService.createUser(createUserDto);
  }

  //test endpoint
  @Get('test-call')
  async testUserServiceCall() {
    const fakeUserId = 'a1b2c3d4-e5f6-7890';

    // It will use the UsersService adapter to call
    // http://user-service:3000/api/v1/users/a1b2c3d4-e5f6-7890/preferences
    return this.usersService.getUserPreferences(fakeUserId);
  }
  // You can proxy any other user-service endpoints here
  // @Get(':id/preferences')
  // ...
}
