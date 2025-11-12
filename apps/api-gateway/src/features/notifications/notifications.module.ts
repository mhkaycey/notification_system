import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notifications.service';

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
  // 2. This creates the NotificationService
  providers: [NotificationService],
  // 3. This "exports" the service so AppModule can use it
  exports: [NotificationService],
})
export class NotificationModule {}
