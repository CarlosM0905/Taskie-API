import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column()
  task_title: string;

  @Column()
  task_description: string;

  @Column()
  task_image_url: string;

  @Column()
  task_created_at: Date;

  @Column()
  task_deleted: boolean;

  @Column()
  user_user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_user_id' })
  user: User;
}
