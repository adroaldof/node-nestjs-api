import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe
} from '@nestjs/common';

import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async list(
    @Query(ValidationPipe) taskFilterDto: FilterTaskDto,
  ): Promise<Task[]> {
    return this.taskService.list(taskFilterDto);
  }

  @Get('/:id')
  async detail(@Param('id') taskId: string): Promise<Task | null> {
    return this.taskService.detail(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
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

  @Put('/:id/status')
  async updateStatus(
    @Param('id') taskId: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    try {
      return this.taskService.update(taskId, { status });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async remove(@Param('id') taskId: string): Promise<void> {
    this.taskService.remove(taskId);
  }
}
