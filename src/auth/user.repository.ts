import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

const errors = {
  default: 'unknown error',
  23505: 'duplicated email',
};

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      const knownErrors = Object.keys(errors);
      if (!knownErrors.includes(error.code)) {
        this.logger.error(
          `Error: signUp | Payload: ${JSON.stringify(authCredentialsDto)}`,
          error.stack,
        );
        throw new InternalServerErrorException();
      }

      this.logger.error(
        `Error: signUp | Payload: ${JSON.stringify(
          authCredentialsDto,
        )} | Message: ${errors[error.code || 'default']}`,
        error.stack,
      );
      throw new ConflictException(errors[error.code || 'default']);
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && user.validatePassword(password)) {
      return user.email;
    }

    return null;
  }
}
