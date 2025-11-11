import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
    // private redisService: RedisService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database health check
      () => this.db.pingCheck('database'),

      // RabbitMQ health check
      () =>
        this.microservice.pingCheck('rabbitmq', {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('RABBITMQ_URL')],
          },
        }),

      // // Redis health check
      // async () => {
      //   try {
      //     await this.redisService.set('health_check', 'ok', 10);
      //     const value = await this.redisService.get('health_check');
      //     return {
      //       redis: {
      //         status: value === 'ok' ? 'up' : 'down',
      //       },
      //     };
      //   } catch (error) {
      //     return {
      //       redis: {
      //         status: 'down',
      //         message: error,
      //       },
      //     };
      //   }
      // },
    ]);
  }

  @Get('ready')
  ready() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      service: 'user-service',
    };
  }

  @Get('live')
  live() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
      service: 'user-service',
    };
  }
}
