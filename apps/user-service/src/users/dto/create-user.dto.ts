import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserPreferenceDto } from './user-preference.dto';

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
    type: UserPreferenceDto,
    example: { email: true, push: true },
  })
  @ValidateNested()
  @Type(() => UserPreferenceDto)
  preferences: UserPreferenceDto;
}
