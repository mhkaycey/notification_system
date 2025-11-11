import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    console.error('GLOBAL EXCEPTION:', exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(exception);
    }

    response.status(status).json({
      success: false,
      // statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // stack: process.env.NODE_ENV === 'development' ? exception : undefined,
    });
  }
}
