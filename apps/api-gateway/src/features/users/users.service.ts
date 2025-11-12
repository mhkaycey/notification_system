import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '@shared/dto/create-user.dto'; // (You need to create this DTO)
import { UserPreferencesDto } from '@shared/dto/user-preferences.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly httpService: HttpService) {}

  // 1. Used by the PROXY controller
  async createUser(createUserDto: CreateUserDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('/api/v1/users', createUserDto),
      );
      return data;
    } catch (error) {
      this.logger.error('Error creating user', error.response.data);
      throw error;
    }
  }

  // 2. Used by the ORCHESTRATOR (NotificationsService)
  // AFTER (The Fix)
  async getUserPreferences(userId: string): Promise<UserPreferencesDto> {
    const url = `/api/v1/users/${userId}/preferences`;
    this.logger.log(`Adapter: Calling user-service at: ${url}`); // Added for debugging

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      // This is a robust way to handle Axios errors
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        this.logger.error(
          `Error from user-service: ${error.response.status}`,
          error.response.data,
        );
      } else if (error.request) {
        // The request was made but no response was received (e.g., ECONNREFUSED)
        this.logger.error(
          `Network error calling user-service: ${error.message}`,
        );
      } else {
        // Something else happened in setting up the request
        this.logger.error(
          `Unknown error in getUserPreferences: ${error.message}`,
        );
      }

      // We still throw a generic error to the client
      throw new Error('User service is unavailable');
    }
  }
}
