import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateNotificationDto } from './notifications.dto';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject('NOTIFICATION_SERVICE') private readonly mqClient: ClientProxy,
  ) {}

  async processNotification(dto: CreateNotificationDto) {
    this.logger.log(`Processing notification for user ${dto.user_id}`);

    try {
      // 1. SYNC Call: Fetch user preferences
      const userPrefUrl = `/api/v1/users/${dto.user_id}/preferences`;
      const { data: prefs } = await firstValueFrom(
        this.httpService.get(userPrefUrl),
      );

      // 2. Check if user wants this notification type
      const notificationType = dto.notification_type;
      if (!notificationType || !prefs[notificationType as keyof typeof prefs]) {
        return {
          request_id: dto.request_id,
          status: 'skipped',
          message: `User has disabled ${notificationType ?? 'unknown'} notifications.`,
        };
      }

      // 3. Publish to message queue
      const routingKey = `${notificationType}.queue`;
      const messagePayload = {
        request_id: dto.request_id,
        user_id: dto.user_id,
        template_code: dto.template_code,
        variables: dto.variables,
      };

      this.mqClient.emit(routingKey, messagePayload);
      this.logger.log(`Published to ${routingKey}`);

      return {
        request_id: dto.request_id,
        status: 'queued',
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error processing notification', error.stack);
      } else {
        this.logger.error('Unknown error', JSON.stringify(error));
      }
      throw new Error('Failed to process notification request.');
    }
  }
}
