import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';


export class EmailRequestDto {
  @IsUUID()
  @IsNotEmpty()
  idempotencyKey: string;

  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsObject()
  @IsNotEmpty()
  userData: Record<string, any>;

  @IsString()
  @IsOptional()
  message?: string;
}
