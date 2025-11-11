// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
//   Index,
// } from 'typeorm';
// import { User } from './user.entity';

// export enum DevicePlatform {
//   IOS = 'ios',
//   ANDROID = 'android',
//   WEB = 'web',
// }

// @Entity('push_tokens')
// @Index(['token'], { unique: true })
// export class PushToken {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => User, (user) => user.push_tokens, { onDelete: 'CASCADE' })
//   user: User;

//   @Column({ unique: true })
//   token: string;

//   @Column({ type: 'enum', enum: DevicePlatform })
//   platform: DevicePlatform;

//   @Column({ nullable: true })
//   device_name: string;

//   @Column({ default: true })
//   is_active: boolean;

//   @Column({ type: 'timestamp', nullable: true })
//   last_used_at: Date;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }
