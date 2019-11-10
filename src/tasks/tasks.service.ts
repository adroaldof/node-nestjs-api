import uuid from 'uuid/v1';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from './dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';
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
    const foundIndex: number = this.tasks.findIndex(({ id }) => id === taskId);

    if (foundIndex === -1) {
      throw new Error('not-found');
    }

    return this.tasks[foundIndex];
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
    const toBeUpdated = this.detail(taskId);
    const updated = { ...toBeUpdated, ...updateTaskDto };
    const foundIndex: number = this.tasks.findIndex(({ id }) => id === taskId);
    this.tasks[foundIndex] = updated;
    return updated;
  }

  remove(taskId: string): Task | null {
    const toBeDeleted = this.detail(taskId);
    const foundIndex: number = this.tasks.findIndex(({ id }) => id === taskId);
    this.tasks.splice(foundIndex, 1);
    return toBeDeleted;
  }
}
