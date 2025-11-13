import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module'; // <-- IMPORT THE ADAPTER
import { QueueModule } from '../../core/queue/queue.module'; // <-- IMPORT THE ADAPTER

@Module({
  imports: [
    UsersModule, // Gives us UsersService
    QueueModule, // Gives us QueueService
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
