import { Controller, Post, Body } from '@nestjs/common';
import { email_service_service } from './email-service.service';
import type { SendEmailDto } from '../shared/types';
@Controller()
export class email_service_controller {
  constructor(private readonly emailServiceService: email_service_service) {}
  // for testing
  @Post('send-email')
  async sendEmail(@Body() dto: SendEmailDto) {
    await this.emailServiceService.handle_email_event(dto); 
    return {
      success: true,
      message:
        'Email event handled (check service logs for actual sending status)',
    };
  }
}
