import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async list(user: User, filterDto?: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async detail(taskId: string | number, user: User): Promise<Task> {
    const where = { id: taskId, userId: user.id };
    const found = await this.taskRepository.findOne({ where });

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

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async update(
    taskId: string | number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const found = await this.detail(taskId, user);
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
    user: User,
  ): Promise<Task> {
    const found = await this.detail(taskId, user);
    found.status = status;
    await found.save();
    return found;
  }

  async remove(taskId: string | number, user: User): Promise<void> {
    const where: any = { id: taskId, userId: user.id };
    const deleted = await this.taskRepository.delete(where);

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
