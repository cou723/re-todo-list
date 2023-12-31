import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { AppModule } from '../src/app.module';
import { TaskEntity } from '../src/entity/task.entity';
import { User } from '../src/entity/user.entity';

describe('User and User API (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let taskRepository: Repository<TaskEntity>;

  // for debug
  // async function showUserRepository() {
  //   console.log(await userRepository.find({}));
  // }
  // async function showTaskRepository() {
  //   console.log(await taskRepository.find({}));
  // }

  function generateTask({
    id = 1,
    createdBy = 1,
    title = `created by ${createdBy}`,
    path = id.toString(),
  }: {
    createdBy?: number;
    id?: number;
    path?: string;
    title?: string;
  }): TaskEntity {
    return {
      createdBy,
      description: 'desc',
      id,
      isDone: false,
      path,
      title,
    };
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          database: 'test.sqlite',
          entities: [User, TaskEntity],
          synchronize: true,
          type: 'sqlite',
        }),
      ],
    }).compile();

    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    taskRepository = moduleRef.get<Repository<TaskEntity>>(getRepositoryToken(TaskEntity));

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const TEST_USER = { password: 'test', username: 'test' };

  beforeEach(async () => {
    await userRepository.clear();
    await taskRepository.clear();
    await userRepository.insert({
      id: 1,
      password: bcrypt.hashSync(TEST_USER.password, 1),
      username: TEST_USER.username,
    });
  });

  // user // -------------------------------------------------------------

  let accessToken: string;

  it('/login POST', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send(TEST_USER);
    expect(res.status).toEqual(200);
    expect(res.header['set-cookie'][0]).toMatch(/accessToken=[^;]+; Path=\/; HttpOnly/);
    accessToken = res.header['set-cookie'][0].split(';')[0].split('=')[1];
  });

  // TODO: /logout
  // it('/logout POST', async () => {});

  it('/register POST', async () => {
    const addedUserName = 'added_user';
    const addedUserPassword = 'added_user';

    const res = await request(app.getHttpServer())
      .post('/register')
      .set('Accept', 'application/json')
      .send({ password: addedUserPassword, username: addedUserName });

    expect(res.status).toEqual(201);

    expect(await userRepository.count()).toEqual(2);

    expect(await userRepository.findOne({ where: { username: addedUserName } })).toHaveProperty(
      'username',
      addedUserName
    );

    expect(await userRepository.findOne({ where: { username: addedUserName } })).toHaveProperty(
      'password'
    );
  });

  it('/user DELETE ', async () => {
    const res = await request(app.getHttpServer())
      .delete('/user')
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken=${accessToken}`])
      .send(TEST_USER);
    expect(res.status).toEqual(204);

    expect(await userRepository.count()).toEqual(0);
  });

  // task //

  async function requestWithHeader(
    path: string,
    method: 'get' | 'post' | 'delete',
    body = {},
    token?: string
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
      const res = await requestWithHeader('/task', 'post', {
        description: 'test',
        title: 'test',
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
      expect(createdTask).toHaveProperty('path', createdTask.id.toString());
    });

    it('/task POST success multiple task', async () => {
      await requestWithHeader('/task', 'post', {
        description: 'test',
        title: 'test',
      });

      const res = await requestWithHeader('/task', 'post', {
        description: 'test',
        title: 'test',
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
      expect(createdTask).toHaveProperty('path', createdTask.id.toString());
    });

    it('/task POST success with parent', async () => {
      await requestWithHeader('/task', 'post', {
        description: 'test',
        title: 'test',
      });

      const parentId = (await taskRepository.findOne({ where: { title: 'test' } })).id;

      const res = await requestWithHeader('/task', 'post', {
        description: 'child',
        parentId,
        title: 'child',
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
      expect(createdTask).toHaveProperty('title', 'child');
      expect(createdTask).toHaveProperty('description', 'child');
      expect(createdTask).toHaveProperty('isDone', false);
      expect(createdTask).toHaveProperty(
        'path',
        parentId.toString() + '/' + createdTask.id.toString()
      );
    });

    it('/task POST fail: un auth', async () => {
      const res = await requestWithHeader(
        '/task',
        'post',
        {
          description: 'test',
          title: 'test',
        },
        'invalid token'
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
        generateTask({ createdBy: 1, id: 1 }),
        generateTask({ createdBy: 1, id: 2 }),
        generateTask({ createdBy: 2, id: 3 }),
      ];
      await taskRepository.insert(tasks);

      const res = await requestWithHeader('/task/list', 'get', {
        description: 'test',
        title: 'test',
      });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(tasks.filter((task) => task.createdBy === 1));
    });

    it('/task/list GET | fail : un auth', async () => {
      const res = await requestWithHeader(
        '/task/list',
        'get',
        {
          description: 'test',
          title: 'test',
        },
        'invalid token'
      );
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id GET
  {
    const tasks = [
      generateTask({ createdBy: 1, id: 1 }),
      generateTask({ createdBy: 1, id: 2 }),
      generateTask({ createdBy: 2, id: 3 }),
    ];

    it('/task/:id GET', async () => {
      await taskRepository.insert(tasks);

      const res = await requestWithHeader('/task/1', 'get');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(tasks[0]);
    });

    it('/task/:id GET fail: permission error', async () => {
      await taskRepository.insert(tasks);

      // This account is not allowed to access task 3 because it is created by another user that user id is 2.
      const res = await requestWithHeader('/task/3', 'get');
      expect(res.status).toEqual(403);
    });

    it('/task/:id GET fail: access no exist "Task"', async () => {
      await taskRepository.insert(tasks);

      const res = await requestWithHeader('/task/100', 'get');
      expect(res.status).toEqual(404);
    });

    it('/task/:id GET fail: un auth', async () => {
      await taskRepository.insert(generateTask({ createdBy: 1, id: 1 }));

      const res = await requestWithHeader('/task/1', 'post', {}, 'invalid token');
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
    });
  }

  // task/:id POST
  {
    it('/task/:id POST', async () => {
      await taskRepository.insert(generateTask({ createdBy: 1, id: 1, title: 'test' }));
      const res = await requestWithHeader('/task/1', 'post', {
        description: 'hoge',
        title: 'test',
      });
      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(1);

      const task = await taskRepository.findOne({ where: { id: 1 } });

      expect(task).toHaveProperty('title', 'test');
      expect(task).toHaveProperty('description', 'hoge');
    });

    it('/task/:id POST fail: un auth', async () => {
      const res = await requestWithHeader(
        '/task/1',
        'post',
        { description: 'test', title: 'test' },
        'invalid token'
      );
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/done POST
  {
    it('/task/:id/done POST', async () => {
      await taskRepository.insert(generateTask({ createdBy: 1, id: 1, title: 'test' }));
      const res = await requestWithHeader('/task/1/done', 'post');

      expect(res.status).toEqual(201);

      const task = await taskRepository.findOne({ where: { id: 1 } });
      expect(task).toHaveProperty('isDone', true);
    });

    it('/task/:id/done POST fail: un auth', async () => {
      const res = await requestWithHeader('/task/1/done', 'post', {}, 'invalid token');
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/undone POST
  {
    it('/task/:id/undone POST', async () => {
      await taskRepository.insert({
        ...generateTask({ createdBy: 1, id: 1, title: 'test' }),
        isDone: true,
      });

      const res = await requestWithHeader('/task/1/undone', 'post');

      expect(res.status).toEqual(201);

      const task = await taskRepository.findOne({ where: { id: 1 } });
      expect(task).toHaveProperty('isDone', false);
    });

    it('/task/:id/undone POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .post('/task/:id/undone')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ description: 'test', title: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/parent POST
  {
    const PARENT_TASK = generateTask({ createdBy: 1, id: 1, title: 'parent' });

    it('/task/:id/parent POST', async () => {
      const tasks = [PARENT_TASK, generateTask({ createdBy: 1, id: 2, title: 'child' })];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 1 });
      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('1/2');
    });

    it('/task/:id/parent POST :change parent', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ createdBy: 1, id: 2, path: '6/1/2', title: 'child' }),
        generateTask({ createdBy: 1, id: 3, path: '6/3', title: 'new_parent' }),
        generateTask({ createdBy: 1, id: 4, path: '6/1/2/4', title: 'grand child' }),
        generateTask({ createdBy: 1, id: 5, path: '6/1/2/4/5', title: 'grand grand child' }),
        generateTask({ createdBy: 1, id: 6, path: '6', title: 'root' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 3 });
      expect(res.status).toEqual(201);
      expect(await taskRepository.count()).toEqual(tasks.length);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('6/3/2');
      expect((await taskRepository.findOne({ where: { id: 4 } })).path).toEqual('6/3/2/4');
      expect((await taskRepository.findOne({ where: { id: 5 } })).path).toEqual('6/3/2/4/5');
    });

    it('/task/:id/parent POST :fail register parent as child', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ createdBy: 1, id: 2, path: '6/1/2', title: 'child' }),
        generateTask({ createdBy: 1, id: 3, path: '6/2/3', title: 'new_parent' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 3 });
      expect(res.status).toEqual(400);
    });

    it('/task/:id/parent POST :fail new parent not exist', async () => {
      const tasks = [PARENT_TASK, generateTask({ createdBy: 1, id: 2, title: 'child' })];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 10 });
      expect(res.status).toEqual(404);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('2');
    });

    it('/task/:id/parent POST :fail new parent is other user task', async () => {
      const tasks = [
        {
          ...PARENT_TASK,
          createdBy: 2,
        },
        generateTask({ createdBy: 1000, id: 2, title: 'child' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .post('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`])
        .send({ newParent: 1 });
      expect(res.status).toEqual(403);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('2');
    });

    it('/task/:id/parent POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .post('/task/1/parent')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ description: 'test', title: 'test' });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unauthorized');
      expect(await taskRepository.count()).toEqual(0);
    });
  }

  // task/:id/parent DELETE
  {
    const PARENT_TASK = generateTask({ createdBy: 1, id: 1, title: 'parent' });

    it('/task/:id/parent DELETE', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ createdBy: 1, id: 2, path: '1/2', title: 'child' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .delete('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`]);
      expect(res.status).toEqual(204);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('2');
    });

    it('/task/:id/parent DELETE :fail task(id) is other users task', async () => {
      const tasks = [
        PARENT_TASK,
        generateTask({ createdBy: 1000, id: 2, path: '1/2', title: 'child' }),
      ];
      await taskRepository.insert(tasks);
      const res = await request(app.getHttpServer())
        .delete('/task/2/parent')
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken=${accessToken}`]);
      expect(res.status).toEqual(403);
      expect(await taskRepository.count()).toEqual(2);
      expect((await taskRepository.findOne({ where: { id: 2 } })).path).toEqual('1/2');
    });

    it('/task/:id/parent POST fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .delete('/task/1/parent')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ description: 'test', title: 'test' });
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
        generateTask({ createdBy: 1, id: 1, title: 'grand parent' }),
        generateTask({ createdBy: 1, id: 2, path: '1/2', title: 'parent' }),
        generateTask({ createdBy: 1, id: 3, path: '1/2/3', title: 'child' }),
        generateTask({ createdBy: 1, id: 4, title: 'other task' }),
      ];
      await taskRepository.insert(tasks);
      const res = await requestWithHeader('/task/1', 'delete');
      expect(res.status).toEqual(204);
      expect(await taskRepository.count()).toEqual(1);
      expect(await taskRepository.findOne({ where: { id: 4 } })).toEqual(tasks[3]);
    });

    it('/task/:id DELETE fail: un auth', async () => {
      const res = await request(app.getHttpServer())
        .delete('/task/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer hoge}`)
        .send({ description: 'test', title: 'test' });
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
