import { Task, TaskStatus } from './task.model';

export const tasks: Task[] = [
  {
    id: 'abe74500-03f6-11ea-94d6-53df4abde6f7',
    title: 'python',
    description: 'is good to know',
    status: TaskStatus.OPEN,
  },
  {
    id: 'ba29ef50-03f6-11ea-94d6-53df4abde6f7',
    title: 'javascript',
    description: 'is good to work with',
    status: TaskStatus.OPEN,
  },
  {
    id: 'cd3433d0-03f6-11ea-94d6-53df4abde6f7',
    title: 'typescript',
    description: 'is secure to play around',
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 'fa4c8b60-03f6-11ea-94d6-53df4abde6f7',
    title: 'java',
    description: 'who knows',
    status: TaskStatus.DONE,
  },
];
