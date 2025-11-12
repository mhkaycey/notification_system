import {
  IsEnum,
  IsString,
  IsUUID,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

// Per the spec: class NotificationType(str, Enum)
enum NotificationType {
  email = 'email',
  push = 'push',
}

// Per the spec: class UserData
class UserData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString() // Or @IsUrl() if you add validation
  @IsNotEmpty()
  link: string; // HttpUrl

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

// The main DTO for the POST body
export class CreateNotificationDto {
  @IsEnum(NotificationType)
  notification_type: NotificationType;

  @IsUUID()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  template_code: string;

  @ValidateNested()
  @Type(() => UserData)
  variables: UserData;

  @IsUUID() // The spec says 'str', but a UUID is good for idempotency
  request_id: string;

  @IsOptional()
  priority?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
