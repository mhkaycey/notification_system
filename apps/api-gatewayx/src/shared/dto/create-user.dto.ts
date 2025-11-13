import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserPreferencesDto } from './user-preferences.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Defines the contract for creating a new user.
 * Used by the api-gateway and user-service.
 */
export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'fcm_token_or_device_token_here',
    required: false,
    description: 'Push notification token (optional)',
  })
  @IsOptional()
  @IsString()
  push_token?: string;

  @ApiProperty({
    type: UserPreferencesDto,
    example: { email: true, push: true },
  })
  @ValidateNested()
  @Type(() => UserPreferencesDto)
  preferences: UserPreferencesDto;

}
