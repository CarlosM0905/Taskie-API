import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTask } from './dto/createTask.dto';
import { GetTasks } from './dto/getTasks.dto';
import { UpdateTask } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(body: GetTasks) {
    try {
      const tasks = await this.taskRepository
        .createQueryBuilder('task')
        .select(['task'])
        .where('task.user_user_id = :user_id', { user_id: body.user_id })
        .where('task.task_deleted = :deleted', { deleted: false })
        .getMany();
      return tasks;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async createTask(body: CreateTask) {
    try {
      const newTask = new Task();
      newTask.task_deleted = false;
      newTask.task_created_at = new Date();
      newTask.task_description = body.description;
      newTask.task_image_url = body.image_url;
      newTask.task_title = body.title;
      newTask.user_user_id = body.user_id;

      const taskCreated = await this.taskRepository.save(newTask);
      return taskCreated;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async updateTask(param: any, body: UpdateTask) {
    try {
      const updatedTask = new Task();
      updatedTask.task_description = body.description;
      updatedTask.task_image_url = body.image_url;
      updatedTask.task_title = body.title;

      const responseUpdate = await this.taskRepository.update(
        param.id,
        updatedTask,
      );
      const { raw } = responseUpdate;
      if (raw.affectedRows === 0) {
        return new NotFoundException();
      } else {
        return {
          taskUpdated: true,
        };
      }
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async deleteTask(param: any) {
    try {
      const responseDelete = await this.taskRepository.delete(param.id);
      const { raw } = responseDelete;
      if (raw.affectedRows === 0) {
        return new NotFoundException();
      } else {
        return {
          taskDeleted: true,
        };
      }
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
