import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from '@shared/dto/create-notification.dto';
import { UsersService } from '../users/users.service';
import { QueueService } from '../../core/queue/queue.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly usersService: UsersService, // <-- Injected adapter
    private readonly queueService: QueueService, // <-- Injected adapter
  ) {}

  async processNotification(dto: CreateNotificationDto) {
    this.logger.log(`Processing notification for user ${dto.user_id}`);

    try {
      // 1. SYNC Call: Handled by the UserService adapter
      const prefs = await this.usersService.getUserPreferences(dto.user_id);

      // 2. LOGIC
      const notificationType = dto.notification_type;
      if (!prefs[notificationType]) {
        return {
          request_id: dto.request_id,
          status: 'skipped',
          message: `User has disabled ${notificationType} notifications.`,
        };
      }

      // 3. ASYNC Push: Handled by the QueueService adapter
      const messagePayload = {
        request_id: dto.request_id,
        user_id: dto.user_id,
        template_code: dto.template_code,
        variables: dto.variables,
      };

      this.queueService.publishNotification(notificationType, messagePayload);

      return {
        request_id: dto.request_id,
        status: 'queued',
      };
    } catch (error) {
      this.logger.error('Error processing notification', error.stack);
      throw new Error('Failed to process notification request.');
    }
  }
}
