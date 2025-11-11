import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType } from '../enums/notification-type.enum';
import { UserData } from './user-data.dto';

/**
 * Nested DTO for the 'variables' property.
 * Per the spec:
 * class UserData:
 * name: str
 * link: HttpUrl
 * meta: Optional[dict]
 */

/**
 * Defines the contract for queuing a new notification.
 * Used by the api-gateway.
 */
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
  @IsNotEmpty()
  variables: UserData;

  @IsUUID()
  request_id: string; // For idempotency

  @IsOptional()
  priority?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
