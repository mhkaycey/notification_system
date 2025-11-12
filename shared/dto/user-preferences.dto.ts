import { IsBoolean } from 'class-validator';

/**
 * Defines the shape of a user's notification preferences.
 * Used by CreateUserDto and the user-service.
 */
export class UserPreferencesDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  push: boolean;
}
