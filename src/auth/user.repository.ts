import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

const errors = {
  default: 'unknown error',
  23505: 'duplicated username',
};

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      const knownErrors = Object.keys(errors);
      if (!knownErrors.includes(error.code)) {
        throw new InternalServerErrorException();
      }

      throw new ConflictException(errors[error.code || 'default']);
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && user.validatePassword(password)) {
      return user.username;
    }

    return null;
  }
}
