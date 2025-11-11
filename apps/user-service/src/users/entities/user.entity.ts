// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export interface UserPreference {
  email: boolean;
  push: boolean;
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique UUID',
  })
  id: string;

  @Column()
  @ApiProperty({ example: 'MH Kaycey', description: 'Full name' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'mhkaycey@example.com', description: 'Unique email' })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // Never expose password
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'fcm_abc123xyz',
    description: 'FCM/APNs push token',
    nullable: true,
  })
  push_token: string | null;

  @Column({
    type: 'jsonb',
    default: { email: true, push: true },
  })
  @ApiProperty({
    example: { email: true, push: false },
    description: 'Notification preferences',
  })
  preferences: UserPreference;

  @CreateDateColumn()
  @ApiProperty({ description: 'Account creation timestamp' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp' })
  updated_at: Date;
}
