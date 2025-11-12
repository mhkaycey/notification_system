// src/consumers/email.consumer.ts

import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { email_service_service } from './email-service.service';
import type { EmailQueueMessage } from 'shared/types';

@Controller()
export class EmailConsumer {
  constructor(private readonly emailService: email_service_service) {}

  @EventPattern('email.queue')
  async handleEmailEvent(
    @Payload() message: EmailQueueMessage,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      console.log(`[Email Consumer] Processing: ${message.id} for ${message.to}`);

      // Process the email
      await this.emailService.process_email(message);

      // Acknowledge and remove from queue
      channel.ack(originalMsg);
      console.log(`
        [Email Consumer] Message ${message.id} processed successfully`);
    } catch (error) {
      console.error(`[Email Consumer] Error processing ${message.id}:`, error);

      // Failed, RabbitMQ handles retry/DLQ
      channel.nack(originalMsg, false, false);
    }
  }
}
