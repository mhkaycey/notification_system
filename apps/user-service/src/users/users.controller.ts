import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  // ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// import { UserPreferenceDto } from './dto/user-preference.dto';
import { ResponseHelper } from '../common/helpers/response.helper';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UuidValidationPipe } from 'src/common/pipes/uuid-validation.pip';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user (Register)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return ResponseHelper.success(user, 'User created successfully');
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', UuidValidationPipe) id: string) {
    const user = await this.usersService.findOne(id);
    return ResponseHelper.success(user, 'User retrieved successfully');
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return ResponseHelper.success(user, 'User updated successfully');
  }

  @Patch(':id/preferences')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user notification preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updatePreferences(
    @Param('id', UuidValidationPipe) id: string,
    @Body() preferences: UpdatePreferenceDto,
  ) {
    const user = await this.usersService.updatePreferences(id, preferences);
    return ResponseHelper.success(user, 'Preferences updated successfully');
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', UuidValidationPipe) id: string) {
    await this.usersService.remove(id);
    return ResponseHelper.success(null, 'User deleted successfully');
  }
}
