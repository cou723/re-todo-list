import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entity/user.entity';
import { Task } from '../src/entity/task.entity';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';

describe('User and User API (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let taskRepository: Repository<Task>;

  // for debug
  // async function showUserRepository() {
  //   console.log(await userRepository.find({}));
  // }
  // async function showTaskRepository() {
  //   console.log(await taskRepository.find({}));
  // }

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

  const TEST_USER = { username: 'test', password: 'test' };

  beforeEach(async () => {
    await userRepository.clear();
    await taskRepository.clear();
    userRepository.insert({
      id: 1,
      username: TEST_USER.username,
      password: bcrypt.hashSync(TEST_USER.password, 1),
    });
  });

  // user // -------------------------------------------------------------

  let accessToken: string;

  it('/login ;POST', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send(TEST_USER);
    expect(res.status).toEqual(201);
    const eventResponse = res.body;
    expect(eventResponse).toHaveProperty('accessToken');
    accessToken = eventResponse.accessToken;
  });

  // TODO: /logout
  // it('/logout ;POST', async () => {});

  it('/register ;POST', async () => {
    const addedUserName = 'added_user';
    const addedUserPassword = 'added_user';

    const res = await request(app.getHttpServer())
      .post('/register')
      .set('Accept', 'application/json')
      .send({ username: addedUserName, password: addedUserPassword });

    expect(res.status).toEqual(201);

    expect(userRepository.count()).resolves.toEqual(2);

    expect(
      await userRepository.findOne({ where: { username: addedUserName } }),
    ).toHaveProperty('username', addedUserName);

    expect(
      await userRepository.findOne({ where: { username: addedUserName } }),
    ).toHaveProperty('password');
  });

  it('/user ;DELETE ', async () => {
    const res = await request(app.getHttpServer())
      .delete('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(TEST_USER);
    expect(res.status).toEqual(200);

    const userCount = await userRepository.count();
    expect(userCount).toEqual(0);
  });

  // task //

  it('/task ;POST', async () => {
    // const res = await request(app.getHttpServer())
    //   .post('/task')
    //   .set('Accept', 'application/json')
    //   .set('Authorization', `Bearer ${accessToken}`)
    //   .send({ title: 'test', description: 'test' });
    // expect(res.status).toEqual(201);
    // expect(taskRepository.count()).resolves.toEqual(1);
    // showUserRepository();
    // showTaskRepository();
    // expect(
    //   taskRepository.find({ where: { createdBy: 1 } }),
    // ).resolves.toHaveProperty('title', 'test');
    // expect(
    //   taskRepository.find({ where: { createdBy: 1 } }),
    // ).resolves.toHaveProperty('description', 'test');
  });
  // it('/task/list ;GET', async () => {});
  // it('/task/:id ;GET', async () => {});
  // it('/task/:id/done ;POST', async () => {});
  // it('/task/:id ;POST', async () => {});
  // it('/task/:id/undone ;POST', async () => {});
  // it('/task/:id/parent ;POST', async () => {});
  // it('/task/:id/parent ;DELETE', async () => {});
  // it('/task/:id ;DELETE', async () => {});

  //----------------------------------------------------------------------

  afterAll(async () => {
    await app.close();
  });
});
