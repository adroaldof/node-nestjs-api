import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  private isStatusValid(status: any): boolean {
    const found = this.allowedStatus.indexOf(status);
    return found !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException({
        key: 'bad-request',
        error: 'Bad Request',
        message: `${value} is and invalid status`,
        statusCode: 400,
      });
    }

    return value;
  }
}
