import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { Task } from '../src/task/task.entity';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';

describe('User and User API (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let taskRepository: Repository<Task>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          entities: [User, Task],
          synchronize: true,
        }),
      ],
    }).compile();

    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    taskRepository = moduleRef.get<Repository<Task>>(getRepositoryToken(Task));

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
    await taskRepository.clear();
    userRepository.save({
      username: 'test',
      password: bcrypt.hashSync('test', 1),
    });
  });

  it('/auth/login | POST   ', async () => {});
  it('/logout     | POST   ', async () => {});
  it('/user/new   | POST   ', async () => {});
  it('/user       | DELETE ', async () => {});

  it('/task            | POST  ', async () => {
    const res = await request(app.getHttpServer())
      .post('/task')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer test')
      .send({ name: 'test' });
    expect(res.status).toEqual(201);

    const eventResponse = res.body as Event;
    expect(eventResponse).toHaveProperty('_id');
    expect(eventResponse.name).toEqual(body.name);
  });
  it('/task/list       | GET   ', async () => {});
  it('/task/:id        | GET   ', async () => {});
  it('/task/:id/done   | POST  ', async () => {});
  it('/task/:id        | POST  ', async () => {});
  it('/task/:id/undone | POST  ', async () => {});
  it('/task/:id/parent | POST  ', async () => {});
  it('/task/:id/parent | DELETE', async () => {});
  it('/task/:id        | DELETE', async () => {});

  afterAll(async () => {
    await app.close();
  });
});
