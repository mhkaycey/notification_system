import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from './queue.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE', // Injection token
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
  providers: [QueueService],
  exports: [QueueService], // <-- IMPORTANT: Makes it available to other modules
})
export class QueueModule {}
