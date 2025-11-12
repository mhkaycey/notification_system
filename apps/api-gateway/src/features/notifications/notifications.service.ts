import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationType } from '../../shared'; // Assuming shared enum

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  // 1. This service's ONLY tool is the RabbitMQ client
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly mqClient: ClientProxy,
  ) {}

  //
  // --- THIS IS THE FUNCTION YOU'RE LOOKING FOR ---
  //
  publishNotification(notificationType: NotificationType, payload: any) {
    const routingKey = `${notificationType}.queue`;

    this.logger.log(`[NotificationService] Publishing to RabbitMQ exchange...`);
    this.logger.log(`  > Exchange: notifications.direct`);
    this.logger.log(`  > Routing Key: ${routingKey}`);

    // 2. This is the *actual* call to RabbitMQ
    this.mqClient.emit(routingKey, payload);
  }
}
