import * as bcrypt from 'bcrypt';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '../auth/user.entity';

const defaultUsers = [
  { username: 'admin@dev.com', password: '@Super123' },
  { username: 'dev@dev.com', password: '@Super123' },
  { username: 'user@dev.com', password: '@Super123' },
];

export class UsersSeeds1574076276623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const user of defaultUsers) {
      const repository = getRepository(User);

      let newUser = await repository.findOne({ username: user.username });

      if (!newUser) {
        newUser = new User();
      }

      newUser.username = user.username;
      newUser.password = user.password;
      newUser.salt = await bcrypt.genSalt();
      newUser.password = await bcrypt.hash(user.password, newUser.salt);

      await repository.save(newUser);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(User);
    await repository.delete({});
  }
}
