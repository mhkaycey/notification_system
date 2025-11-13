import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import type { SendEmailDto } from '../shared/types';

@Injectable()
export class email_service_service {
  constructor(private readonly mailer_service: MailerService) {}
  public async handle_email_event(dto: SendEmailDto) {
    console.log(`[Email Service] Received email job for: ${dto.to}`);

    try {
      // send email
      await this.mailer_service.sendMail({
        to: dto.to,
        subject: dto.subject,
        html: dto.html,
      });

      console.log(`[Email Service] Successfully sent email to ${dto.to}`);
    } catch (error) {
      console.error(`[Email Service] Failed to send email to ${dto.to}`, error);
    }
  }
}
