import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationType } from 'src/shared';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly mqClient: ClientProxy,
  ) {}

  publishNotification(notificationType: NotificationType, payload: any) {
    const routingKey = `${notificationType}.queue`;

    this.logger.log(`[NotificationService] Publishing to RabbitMQ exchange...`);
    this.logger.log(`  > Exchange: notifications.direct`);
    this.logger.log(`  > Routing Key: ${routingKey}`);

    // 2. This is the *actual* call to RabbitMQ
    this.mqClient.emit(routingKey, payload);
  }
}
