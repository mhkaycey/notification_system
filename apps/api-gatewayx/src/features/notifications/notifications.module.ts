import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module'; // <-- IMPORT THE ADAPTER
import { QueueModule } from '../../core/queue/queue.module'; // <-- IMPORT THE ADAPTER
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // 1. This registers the RabbitMQ client from docker-compose.yml
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE', // The injection token
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], // Docker service name
          exchange: 'notifications.direct',
          exchangeType: 'direct',
          noAck: true,
        },
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
