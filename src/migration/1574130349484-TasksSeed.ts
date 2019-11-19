import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '../auth/user.entity';
import { TaskStatus } from '../tasks/task-status.enum';
import { Task } from '../tasks/task.entity';

export const tasks = [
  {
    title: 'python',
    description: 'is good to know',
    status: TaskStatus.OPEN,
    userEmail: 'admin@dev.com',
  },
  {
    title: 'javascript',
    description: 'is good to work with',
    status: TaskStatus.OPEN,
    userEmail: 'dev@dev.com',
    userId: 2,
  },
  {
    title: 'typescript',
    description: 'is secure to play around',
    status: TaskStatus.IN_PROGRESS,
    userEmail: 'admin@dev.com',
    userId: 1,
  },
  {
    title: 'java',
    description: 'who knows',
    status: TaskStatus.DONE,
    userEmail: 'user@dev.com',
  },
];

export class TasksSeed1574130349484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const task of tasks) {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email: task.userEmail });

      if (!user) {
        return;
      }

      const newTask = new Task();
      newTask.title = task.title;
      newTask.description = task.description;
      newTask.status = task.status;
      newTask.user = user;
      newTask.userId = user.id;
      newTask.user = await userRepository.findOne(task.userId);

      const repository = getRepository(Task);
      await repository.save(newTask);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Task);
    await repository.delete({});
  }
}
