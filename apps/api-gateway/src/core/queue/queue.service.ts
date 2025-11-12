import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly mqClient: ClientProxy,
  ) {}

  publishNotification(notificationType: 'email' | 'push', payload: any) {
    const routingKey = `${notificationType}.queue`;
    this.logger.log(`Publishing to ${routingKey} with payload`, payload);
    this.mqClient.emit(routingKey, payload);
  }
}
