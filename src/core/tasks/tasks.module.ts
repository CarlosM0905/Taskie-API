import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from 'src/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const entities = [Task];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
