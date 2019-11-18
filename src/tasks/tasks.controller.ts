import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/decorators';
import { User } from '../auth/user.entity';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { TaskStatusValidationPipe } from './pipes';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async list(
    @Query(ValidationPipe) taskFilterDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.list(user, taskFilterDto);
  }

  @Get('/:id')
  async detail(
    @Param('id') taskId: string | number,
    @GetUser() user: User,
  ): Promise<Task | null> {
    return this.taskService.detail(taskId, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.create(createTaskDto, user);
  }

  @Delete('/:id')
  async remove(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.remove(taskId, user);
  }

  @Put('/:id')
  async update(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.update(taskId, updateTaskDto, user);
  }

  @Put('/:id/status')
  async updateStatus(
    @Param('id') taskId: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateStatus(taskId, status, user);
  }
}
