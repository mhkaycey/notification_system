import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateUserDto } from '../../shared/dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly httpService: HttpService) {}

  async createUser(createUserDto: CreateUserDto) {
    const url = '/users';
    this.logger.log(`Adapter: Calling user-service at POST ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url, createUserDto),
      );
      return data; // Return the full { success: true, ... } object
    } catch (error) {
      // --- THIS IS THE ROBUST CATCH BLOCK ---
      if (error instanceof AxiosError) {
        if (error.response) {
          // This will log the { message: 'User already exists' } conflict
          this.logger.error(
            `Error from user-service: ${error.response.status}`,
            error.response.data,
          );
        } else if (error.request) {
          // This catches the "ECONNREFUSED" network error
          this.logger.error(
            `Network error calling user-service: ${error.message}`,
          );
        } else {
          this.logger.error(`Unknown Axios error: ${error.message}`);
        }
      } else {
        // A non-Axios error
        this.logger.error('Unknown/Non-Axios error in createUser', error);
      }

      throw new Error('User service is unavailable');
    }
  }

  // This is our NEW, refactored function
  async getUserById(userId: string): Promise<any> {
    const url = `/users/${userId}`;
    this.logger.log(`Adapter: Calling user-service at: ${url}`);

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data.data; // Return the user object
    } catch (error) {
      // 2. THIS IS THE FIX: Check if 'error' is an AxiosError
      if (error instanceof AxiosError) {
        // 3. Now TypeScript is happy!
        // It *knows* 'error.response' is a valid property.
        if (error.response) {
          this.logger.error(
            `Error from user-service: ${error.response.status}`,
            error.response.data,
          );
        } else if (error.request) {
          // It also knows 'error.request' is valid.
          this.logger.error(
            `Network error calling user-service: ${error.message}`,
          );
        } else {
          this.logger.error(`Unknown Axios error: ${error.message}`);
        }
      } else {
        // 4. It might be a non-Axios error (e.g., a typo)
        this.logger.error('Unknown/Non-Axios error in getUserById', error);
      }

      throw new Error('User service is unavailable');
    }
  }
  // async getUserPreferences(userId: string): Promise<UserPreferencesDto> {
  //   const url = `/api/v1/users/${userId}/preferences`;
  //   this.logger.log(`Adapter: Calling user-service at: ${url}`);

  //   try {
  //     const { data } = await firstValueFrom(this.httpService.get(url));
  //     return data;
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       if (error.response) {
  //         this.logger.error(
  //           `Error from user-service: ${error.response.status}`,
  //           error.response.data,
  //         );
  //       } else if (error.request) {
  //         this.logger.error(
  //           `Network error calling user-service: ${error.message}`,
  //         );
  //       }
  //     } else {
  //       this.logger.error(
  //         `Unknown error in getUserPreferences: ${(error as Error).message}`,
  //       );
  //     }

  //     throw new Error('User service is unavailable');
  //   }
  // }
}
