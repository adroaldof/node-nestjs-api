import * as uuid from 'uuid/v1';
import { CreateClassDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  list(): Task[] {
    return this.tasks;
  }

  create(createTaskDto: CreateClassDto): Task {
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
}
