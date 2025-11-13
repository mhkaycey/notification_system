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
}
//test endpoint
