import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe
} from '@nestjs/common';

import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { TaskStatusValidationPipe } from './pipes';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
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
  async detail(@Param('id') taskId: string | number): Promise<Task | null> {
    return this.taskService.detail(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Delete('/:id')
  async remove(@Param('id') taskId: string): Promise<void> {
    this.taskService.remove(taskId);
  }

  @Put('/:id')
  async update(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Put('/:id/status')
  async updateStatus(
    @Param('id') taskId: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateStatus(taskId, status);
  }
}
