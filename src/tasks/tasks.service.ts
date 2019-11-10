import uuid from 'uuid/v1';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dto';
import { Task, TaskStatus } from './task.model';
import { tasks } from './tasks';

@Injectable()
export class TasksService {
  private tasks: Task[] = tasks || [];

  list(filterDto?: FilterTaskDto): Task[] {
    if (!filterDto || !Object.keys(filterDto).length) {
      return this.tasks;
    }

    const { status, search } = filterDto;

    if (status) {
      return this.tasks.filter(task => task.status === status);
    }

    if (search) {
      return this.tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return this.tasks;
  }

  detail(taskId: string): Task | null {
    const found: Task = this.tasks.find(({ id }) => id === taskId);

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

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  update(taskId: string, updateTaskDto: UpdateTaskDto): Task {
    const found = this.detail(taskId);
    const updated = { ...found, ...updateTaskDto };
    const foundIndex: number = this.tasks.findIndex(({ id }) => id === taskId);
    this.tasks[foundIndex] = updated;
    return updated;
  }

  remove(taskId: string): void {
    this.detail(taskId);
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }
}
