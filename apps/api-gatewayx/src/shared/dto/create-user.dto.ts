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
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  push_token?: string;

  @ValidateNested()
  @Type(() => UserPreferencesDto)
  @IsNotEmpty()
  preferences!: UserPreferencesDto;
}
