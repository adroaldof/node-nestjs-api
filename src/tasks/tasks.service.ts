import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  list(): Task[] {
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
