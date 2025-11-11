import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserPreferenceDto } from './user-preference.dto';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'new_push_token_here' })
  @IsOptional()
  @IsString()
  push_token?: string;

  @ApiProperty({
    required: false,
    type: UserPreferenceDto,
    example: { email: false, push: true },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPreferenceDto)
  preferences?: UserPreferenceDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
