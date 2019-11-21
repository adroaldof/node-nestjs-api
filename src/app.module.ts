import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({ dest: '../uploads' }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
