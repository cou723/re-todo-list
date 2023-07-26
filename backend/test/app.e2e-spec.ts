import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entity/user.entity';
import { TaskEntity } from '../src/entity/task.entity';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';

describe('User and User API (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let taskRepository: Repository<TaskEntity>;

  // for debug
  async function showUserRepository() {
    console.log(await userRepository.find({}));
  }
  async function showTaskRepository() {
    console.log(await taskRepository.find({}));
  }

  function generateTask({
    id = 1,
    createdBy = 1,
    title = `created by ${createdBy}`,
    path = '',
  }: {
    id?: number;
    title?: string;
    createdBy?: number;
    path?: string;
  }): TaskEntity {
    return {
      id,
      title,
      description: 'desc',
      isDone: false,
      createdBy,
      path: path ?? '',
    };
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          entities: [User, TaskEntity],
          synchronize: true,
        }),
      ],
    }).compile();

    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    taskRepository = moduleRef.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );

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

  it('/login POST', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send(TEST_USER);
    expect(res.status).toEqual(201);
    expect(res.header['set-cookie'][0]).toMatch(
      /accessToken=[^;]+; Path=\/; HttpOnly/,
    );
    accessToken = res.header['set-cookie'][0];
  });

  // TODO: /logout
  // it('/logout POST', async () => {});

  it('/register POST', async () => {
    const addedUserName = 'added_user';
    const addedUserPassword = 'added_user';

    const res = await request(app.getHttpServer())
      .post('/register')
      .set('Accept', 'application/json')
      .send({ username: addedUserName, password: addedUserPassword });

    expect(res.status).toEqual(201);

    expect(await userRepository.count()).toEqual(2);

    expect(
      await userRepository.findOne({ where: { username: addedUserName } }),
    ).toHaveProperty('username', addedUserName);

    expect(
      await userRepository.findOne({ where: { username: addedUserName } }),
    ).toHaveProperty('password');
  });

  it('/user DELETE ', async () => {
    const res = await request(app.getHttpServer())
      .delete('/user')
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken=${accessToken}`])
      .send(TEST_USER);
    expect(res.status).toEqual(200);

    expect(await userRepository.count()).toEqual(0);
  });

  // task //

  async function requestWrapper(
    path: string,
    method: 'get' | 'post' | 'delete',
    body = {},
    token?: string,
  ) {
    return await request(app.getHttpServer())
      [method](path)
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken=${token ?? accessToken}`])
      .send(body);
  }

  //// /task POST

  {
    it('/task POST success single task ', async () => {
      const res = await requestWrapper('/task', 'post', {
        title: 'test',
        description: 'test',
      });

      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(1);

      const createdTask = await taskRepository.findOne({
        where: { createdBy: 1 },
      });

      expect(createdTask).toHaveProperty('id');
      expect(createdTask).toHaveProperty('createdBy', 1);
      expect(createdTask).toHaveProperty('title', 'test');
      expect(createdTask).toHaveProperty('description', 'test');
      expect(createdTask).toHaveProperty('isDone', false);
      expect(createdTask).toHaveProperty('path', '');
    });

    it('/task POST success multiple task', async () => {
      await requestWrapper('/task', 'post', {
        title: 'test',
        description: 'test',
      });

      const res = await requestWrapper('/task', 'post', {
        title: 'test',
        description: 'test',
      });

      expect(res.status).toEqual(201);

      expect(await taskRepository.count()).toEqual(2);

      const createdTask = await taskRepository
        .createQueryBuilder('task')
        .orderBy('task.id', 'DESC')
        .limit(1)
        .getOne();

      expect(createdTask).toHaveProperty('id');
      expect(createdTask).toHaveProperty('createdBy', 1);
      expect(createdTask).toHaveProperty('title', 'test');
      expect(createdTask).toHaveProperty('description', 'test');
      expect(createdTask).toHaveProperty('isDone', false);
      expect(createdTask).toHaveProperty('path', '');
    });

    it('/task POST fail: un auth', async () => {
      const res = await requestWrapper(
        '/task',
        'post',
        {
          title: 'test',
          description: 'test',
        },
        'invalid token',
      );

      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  //// task/list GET

  {
    it('/task/list GET', async () => {
      const tasks = [
        generateTask({ id: 1, createdBy: 1 }),
        generateTask({ id: 2, createdBy: 1 }),
        generateTask({ id: 3, createdBy: 2 }),
      ];
      await taskRepository.insert(tasks);

      const res = await requestWrapper('/task/list', 'get', {
        title: 'test',
        description: 'test',
      });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(tasks.filter((task) => task.createdBy === 1));
    });

    it('/task/list GET | fail : un auth', async () => {
      const res = await requestWrapper(
        '/task/list',
        'get',
        {
          title: 'test',
          description: 'test',
        },
        'invalid token',
      );
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id GET
  {
    const tasks = [
      generateTask({ id: 1, createdBy: 1 }),
      generateTask({ id: 2, createdBy: 1 }),
      generateTask({ id: 3, createdBy: 2 }),
    ];

    it('/task/:id GET', async () => {
      await taskRepository.insert(tasks);

      const res = await requestWrapper('/task/1', 'get');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(tasks[0]);
    });

    it('/task/:id GET fail: permission error', async () => {
      await taskRepository.insert(tasks);

      // This account is not allowed to access task 3 because it is created by another user that user id is 2.
      const res = await requestWrapper('/task/3', 'get');
      expect(res.status).toEqual(403);
    });

    it('/task/:id GET fail: access no exist "Task"', async () => {
      await taskRepository.insert(tasks);

      const res = await requestWrapper('/task/100', 'get');
      expect(res.status).toEqual(404);
    });

    it('/task/:id GET fail: un auth', async () => {
      taskRepository.insert(generateTask({ id: 1, createdBy: 1 }));

      const res = await requestWrapper('/task/1', 'post', {}, 'invalid token');
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
    });
  }

  // task/:id POST
  {
    it('/task/:id POST', async () => {
      await taskRepository.insert(
        generateTask({ id: 1, title: 'test', createdBy: 1 }),
      );
      const res = await requestWrapper('/task/1', 'post', {
        title: 'test',
        description: 'hoge',
      });
      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(1);

      const task = await taskRepository.findOne({ where: { id: 1 } });

      expect(task).toHaveProperty('title', 'test');
      expect(task).toHaveProperty('description', 'hoge');
    });

    it('/task/:id POST fail: un auth', async () => {
      const res = await requestWrapper(
        '/task/1',
        'post',
        { title: 'test', description: 'test' },
        'invalid token',
      );
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/done POST
  {
    it('/task/:id/done POST', async () => {
      await taskRepository.insert(
        generateTask({ id: 1, title: 'test', createdBy: 1 }),
      );
      const res = await requestWrapper('/task/1/done', 'post');

      expect(res.status).toEqual(201);

      const task = await taskRepository.findOne({ where: { id: 1 } });
      expect(task).toHaveProperty('isDone', true);
    });

    it('/task/:id/done POST fail: un auth', async () => {
      const res = await requestWrapper(
        '/task/1/done',
        'post',
        {},
        'invalid token',
      );
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/undone POST
  {
    it('/task/:id/undone POST', async () => {
      await taskRepository.insert({
        ...generateTask({ id: 1, title: 'test', createdBy: 1 }),
        isDone: true,
      });

      const res = await requestWrapper('/task/1/undone', 'post');

      expect(res.status).toEqual(201);

      const task = await taskRepository.findOne({ where: { id: 1 } });
      expect(task).toHaveProperty('isDone', false);
    });

    it('/task/:id/undone POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .post('/task/:id/undone')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ title: 'test', description: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/parent POST
  {
    const PARENT_TASK = generateTask({ id: 1, title: 'parent', createdBy: 1 });

    it('/task/:id/parent POST', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ id: 2, title: 'child', createdBy: 1 }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 1 });
      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual(
        '1',
      );
    });

    it('/task/:id/parent POST :fail new parent not exist', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ id: 2, title: 'child', createdBy: 1 }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 10 });
      expect(res.status).toEqual(404);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual(
        '',
      );
    });

    it('/task/:id/parent POST :fail new parent is other user task', async () => {
      const tasks = [
        {
          ...PARENT_TASK,
          createdBy: 2,
        },
        generateTask({ id: 2, title: 'child', createdBy: 1000 }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 1 });
      expect(res.status).toEqual(403);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual(
        '',
      );
    });

    it('/task/:id/parent POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .post('/task/1/parent')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ title: 'test', description: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/parent DELETE
  {
    const PARENT_TASK = generateTask({ id: 1, title: 'parent', createdBy: 1 });

    it('/task/:id/parent DELETE', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ id: 2, title: 'child', createdBy: 1, path: '1' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .delete('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`]);
      expect(res.status).toEqual(200);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual(
        '',
      );
    });

    it('/task/:id/parent DELETE :fail task(id) is other users task', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ id: 2, title: 'child', createdBy: 1000, path: '1' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .delete('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`]);
      expect(res.status).toEqual(403);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual(
        '1',
      );
    });

    it('/task/:id/parent POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .delete('/task/1/parent')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ title: 'test', description: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id DELETE
  {
    // if delete grand parent task, child task and parent task is deleted.
    it('/task/:id DELETE', async () => {
      const tasks = [
        generateTask({ id: 1, title: 'grand parent', createdBy: 1 }),
        generateTask({ id: 2, title: 'parent', createdBy: 1, path: '1' }),
        generateTask({ id: 3, title: 'child', createdBy: 1, path: '1/2' }),
        generateTask({ id: 4, title: 'other task', createdBy: 1 }),
      ];
      await taskRepository.insert(tasks);
      const res = await requestWrapper('/task/1', 'delete');
      expect(res.status).toEqual(200);
      expect(await taskRepository.count()).toEqual(1);
      expect(await taskRepository.findOne({ where: { id: 4 } })).toEqual(
        tasks[3],
      );
    });

    it('/task/:id DELETE fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .delete('/task/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ title: 'test', description: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }
  //----------------------------------------------------------------------

  afterAll(async () => {
    await app.close();
  });
});
