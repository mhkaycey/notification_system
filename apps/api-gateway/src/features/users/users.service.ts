import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { UserPreferencesDto } from '../../shared/dto/user-preferences.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly httpService: HttpService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('/api/v1/users', createUserDto),
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.logger.error('Error creating user', error.response.data);
      } else {
        this.logger.error(
          'Unknown error creating user',
          (error as Error).message,
        );
      }
      throw error;
    }
  }

  async getUserPreferences(userId: string): Promise<UserPreferencesDto> {
    const url = `/api/v1/users/${userId}/preferences`;
    this.logger.log(`Adapter: Calling user-service at: ${url}`);

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          this.logger.error(
            `Error from user-service: ${error.response.status}`,
            error.response.data,
          );
        } else if (error.request) {
          this.logger.error(
            `Network error calling user-service: ${error.message}`,
          );
        }
      } else {
        this.logger.error(
          `Unknown error in getUserPreferences: ${(error as Error).message}`,
        );
      }

      throw new Error('User service is unavailable');
    }
  }
}
