import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_username: string;

  @Column()
  user_password: string;

  @Column()
  user_email: string;

  @Column()
  user_name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
