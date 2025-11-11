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

/**
 * Defines the contract for creating a new user.
 * Used by the api-gateway and user-service.
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Good practice for passwords
  password: string;

  @IsOptional()
  @IsString()
  push_token?: string;

  @ValidateNested() // <-- Tells the validator to check the nested object
  @Type(() => UserPreferencesDto) // <-- Tells class-transformer how to create the object
  @IsNotEmpty()
  preferences: UserPreferencesDto;
}
