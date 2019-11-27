import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { appPort } from './config';
import { appHost } from './config/constants';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);
  logger.log(`Listen at ${appHost}:${appPort}`);
}

bootstrap();
