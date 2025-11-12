import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { UsersService } from './features/users/users.service'; // <-- Tool #1
import { NotificationService } from './features/notifications/notifications.service'; // <-- Tool #2
import { CreateNotificationDto, NotificationType } from './shared';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  // This is the CORRECT "Toolbelt"
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  // This is the CORRECT "Job" logic you pasted
  async processNotification(dto: CreateNotificationDto) {
    this.logger.log(
      `[AppService] Processing notification for user ${dto.user_id}`,
    );

    try {
      // 1. SYNC Call: Get the FULL user object
      const user = await this.usersService.getUserById(dto.user_id);
      this.logger.log(`[AppService] Successfully fetched user: ${user.name}`);

      // 2. LOGIC: Get the preferences
      const prefs = user.preferences;
      if (!prefs) {
        throw new Error('User preferences not found');
      }

      // 3. Check the preference
      const notificationType = dto.notification_type;
      if (!prefs[notificationType]) {
        return {
          request_id: dto.request_id,
          status: 'skipped',
          message: `User has disabled ${notificationType} notifications.`,
        };
      }

      // 4. Create the payload
      const messagePayload = {
        request_id: dto.request_id,
        user_id: dto.user_id,
        user_email: user.email,
        user_name: user.name,
        template_code: dto.template_code,
        variables: dto.variables,
      };

      // 5. ASYNC Push: Publish the job
      this.notificationService.publishNotification(
        notificationType as NotificationType,
        messagePayload,
      );

      // 6. Return "Queued" to the client
      return {
        request_id: dto.request_id,
        status: 'queued',
      };
    } catch (error) {
      // 7. Handle any errors
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          this.logger.error(
            'Error from downstream user-service',
            error.response?.data,
          );
        } else {
          this.logger.error(
            `Error processing notification: ${error.message}`,
            error.stack,
          );
        }
      } else {
        this.logger.error('Unknown error in processNotification', error);
      }
      throw new Error('Failed to process notification request.');
    }
  }
}
