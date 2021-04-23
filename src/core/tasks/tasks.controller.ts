import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTask } from './dto/createTask.dto';
import { GetTasks } from './dto/getTasks.dto';
import { UpdateTask } from './dto/updateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/')
  async getTasks(@Body() body: GetTasks) {
    const tasks = await this.taskService.getTasks(body);
    return tasks;
  }
  @Post('/')
  async createTask(@Body() body: CreateTask) {
    const taskCreated = await this.taskService.createTask(body);
    return taskCreated;
  }

  @Put('/:id')
  async updateTask(@Param() param: any, @Body() body: UpdateTask) {
    const taskUpdated = await this.taskService.updateTask(param, body);
    return taskUpdated;
  }
  @Delete('/:id')
  async deleteTask(@Param() param: any) {
    const taskDeleted = await this.taskService.deleteTask(param);
    return taskDeleted;
  }
}
