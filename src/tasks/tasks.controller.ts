import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async list(): Promise<Task[]> {
    return this.taskService.list();
  }

  @Get('/:id')
  async detail(@Param('id') taskId: string): Promise<Task | null> {
    return this.taskService.detail(taskId);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return this.taskService.create(createTaskDto);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      return this.taskService.update(taskId, updateTaskDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async remove(@Param('id') taskId: string): Promise<Task | null> {
    return this.taskService.remove(taskId);
  }
}
