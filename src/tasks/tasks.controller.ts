import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateClassDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  list() {
    return this.taskService.list();
  }

  @Post()
  async create(@Body() createTaskDto: CreateClassDto): Promise<Task> {
    try {
      return this.taskService.create(createTaskDto);
    } catch (error) {
      throw error;
    }
  }
}
