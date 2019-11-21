import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { User } from '../auth/user.entity';
import { FilterTaskDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockedUser: User = {
  id: 1,
  email: 'dev@test.com',
  salt: 'salt',
  password: 'password',
  tasks: [],
} as User;

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TaskService', () => {
  let service: TasksService;
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    service = await module.get<TasksService>(TasksService);
    repository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('get', () => {
    const filters: FilterTaskDto = {
      status: TaskStatus.IN_PROGRESS,
      search: 'something',
    };

    it('should repository get tasks to have been called', async () => {
      await service.list(filters, mockedUser);
      expect(repository.getTasks).toHaveBeenCalled();
    });

    it('should get all tasks from repository', async () => {
      repository.getTasks.mockResolvedValueOnce([]);
      const result = await service.list(filters, mockedUser);
      expect(result).toEqual([]);
    });
  });

  describe('detail', () => {
    it('should repository find ond to have been called', async () => {
      const mockedTask = { title: 'Title', description: 'Description' };
      repository.findOne.mockResolvedValueOnce(mockedTask);
      await service.detail(1, mockedUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockedUser.id },
      });
    });

    it('should thrown when user is not found', async () => {
      repository.findOne.mockResolvedValueOnce(null);
      await expect(service.detail(1, mockedUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
