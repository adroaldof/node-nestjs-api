# Node NestJS Sample Api

This is a sample project created using [Nest](https://github.com/nestjs/nest) among other tools as [TypeScript](https://www.typescriptlang.org/), [TypeORM](https://typeorm.io/#/), [Postgres](https://www.postgresql.org/), [Docker](https://www.docker.com/) and some others

## Running

### Using Docker

Just step in the root directory and enter the follow command

```bash
$ docker-compose up
```

When your are done working

```bash
$ docker-compose down
```

### Running Locally

If you are not using Docker make sure you have setup correctly `./ormconfig.json` and `./src/config/typeorm.config.ts` files

```bash
$ npm install
```

Now choose one of the follow commands

```bash
# watch mode
$ npm run dev

# development
$ npm run start

# production mode
$ npm run start:prod
```

### Using

After running the project it will display all routes in the terminal log and you can check it out at [http://localhost:3000](http://localhost:3000)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run coverage
```

---

Enjoy it 👍
