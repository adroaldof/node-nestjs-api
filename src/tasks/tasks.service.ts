import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async list(filterDto?: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async detail(taskId: string | number): Promise<Task> {
    const found = await this.taskRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException({
        key: 'not-found',
        error: 'Not Found',
        message: `Could't find task with id ${taskId}`,
        statusCode: 404,
      });
    }

    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async update(
    taskId: string | number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const found = await this.detail(taskId);
    const { title, description, status } = updateTaskDto;
    found.title = title;
    found.description = description;
    found.status = status;
    await found.save();
    return found;
  }

  async updateStatus(
    taskId: string | number,
    status: TaskStatus,
  ): Promise<Task> {
    const found = await this.detail(taskId);
    found.status = status;
    await found.save();
    return found;
  }

  async remove(taskId: string | number): Promise<void> {
    const deleted = await this.taskRepository.delete(taskId);

    if (!deleted.affected || deleted.affected === 0) {
      throw new NotFoundException({
        key: 'not-found',
        error: 'Not Found',
        message: `Could't find task with id ${taskId}`,
        statusCode: 404,
      });
    }
  }
}
