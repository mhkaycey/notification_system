import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class UserData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // You could also use @IsUrl()
  link: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}
