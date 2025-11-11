// import { Controller, Get } from '@nestjs/common';
// import { UserServiceService } from './user-service.service';

// @Controller()
// export class UserServiceController {
//   constructor(private readonly userServiceService: UserServiceService) {}

//   @Get()
//   getHello(): string {
//     return this.userServiceService.getHello();
//   }
// }

import { Controller, Get, Param, Logger } from '@nestjs/common';
import { UserPreferencesDto } from '@shared/dto/user-preferences.dto'; // <-- Using our shared DTO!

@Controller('api/v1/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  // This is the real endpoint our gateway's adapter is built to call
  @Get(':id/preferences')
  getUserPreferences(@Param('id') id: string): UserPreferencesDto {
    this.logger.log(`Returning mock preferences for user ${id}`);

    // Return a hardcoded "mock" DTO for this test
    return {
      email: true,
      push: true,
    };
  }
}
