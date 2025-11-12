// import { Controller, Get } from '@nestjs/common';
// import { ApiGatewayService } from './api-gateway.service';

// @Controller()
// export class ApiGatewayController {
//   constructor(private readonly apiGatewayService: ApiGatewayService) {}

//   @Get()
//   getHello(): string {
//     return this.apiGatewayService.getHello();
//   }
// }

import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateNotificationDto } from './notifications.dto';

@Controller('api/v1/notifications') // Sets the base path
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post()
  @HttpCode(202) // Return "Accepted" since this is async
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    // The ValidationPipe (enabled in main.ts)
    // has already validated the DTO for us.

    // Now, pass it to the service to do the real work
    const result = await this.apiGatewayService.processNotification(
      createNotificationDto,
    );

    return {
      success: true,
      message: 'Notification request accepted.',
      data: result,
      // No pagination meta needed for a POST request
    };
  }
}
