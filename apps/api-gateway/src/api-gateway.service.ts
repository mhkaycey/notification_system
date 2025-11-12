// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ApiGatewayService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { CreateNotificationDto } from './notifications.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  constructor(
    private readonly httpService: HttpService, // Injects REST client
    @Inject('NOTIFICATION_SERVICE') private readonly mqClient: ClientProxy, // Injects RabbitMQ client
  ) {}

  async processNotification(dto: CreateNotificationDto) {
    this.logger.log(`Processing notification for user ${dto.user_id}`);

    try {
      // 1. SYNC Call: Fetch user preferences from User-Service
      // (This assumes the user-service has a /users/:id/preferences endpoint)
      const userPrefUrl = `/api/v1/users/${dto.user_id}/preferences`;
      const { data: prefs } = await firstValueFrom(
        this.httpService.get(userPrefUrl),
      );

      // 2. LOGIC: Check if user wants this notification type
      const notificationType = dto.notification_type; // 'email' or 'push'
      if (!prefs[notificationType]) {
        return {
          request_id: dto.request_id,
          status: 'skipped',
          message: `User has disabled ${notificationType} notifications.`,
        };
      }

      // 3. ASYNC Push: Publish to the correct queue via the exchange
      // The routing key determines which queue it goes to (email.queue or push.queue)
      const routingKey = `${notificationType}.queue`;

      // We need to create the final message payload.
      // The email/push service needs all the info.
      const messagePayload = {
        request_id: dto.request_id,
        user_id: dto.user_id,
        template_code: dto.template_code,
        variables: dto.variables,
        // You can add user details here (like email)
        // after fetching them from the user service.
      };

      this.mqClient.emit(routingKey, messagePayload);
      this.logger.log(`Published to ${routingKey}`);

      return {
        request_id: dto.request_id,
        status: 'queued',
      };
    } catch (error) {
      this.logger.error('Error processing notification', error.stack);
      // Handle errors (e.g., user not found, user-service down)
      // This is where a Circuit Breaker would be useful.
      throw new Error('Failed to process notification request.');
    }
  }
}
