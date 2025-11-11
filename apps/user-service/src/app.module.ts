import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 1. ConfigModule - Global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true, // Recommended for production
    }),

    // 2. TypeORM - Async with ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Required to inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          User,
          // PushToken,
          // NotificationPreference,
        ],
        synchronize: process.env.NODE_ENV !== 'production', // NEVER in prod!
        logging: configService.get('NODE_ENV') === 'development',
        // logging: process.env.NODE_ENV === 'development',
        retryAttempts: 3,
        retryDelay: 3001,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    HealthModule,
  ],
  // exports: [ClientsModule],
})
export class AppModule {}
