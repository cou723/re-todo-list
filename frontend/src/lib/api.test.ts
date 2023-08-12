import { type Server } from 'http';

import jsonServer from 'json-server';

import TaskApi from './api';

describe('Task Api', () => {
  let server: Server;
  beforeAll(() => {
    const app = jsonServer.create();
    const router = jsonServer.router('db.json');
    const routes = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '/task/:id': '/task/:id',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '/task/list': '/task',
    };
    app.use(jsonServer.rewriter(routes));
    app.use(router);
    server = app.listen(8000);
  });

  afterAll(() => {
    server.close();
  });

  it('fetches user data', async () => {
    const data = await TaskApi.get(1);
    expect(data.ok).toBeTruthy();
    expect(data.val).toEqual({
      createdBy: 1,
      description: 'This is task 1',
      id: 1,
      isDone: false,
      path: '1',
      title: 'Task 1',
    });
  });

  it('fetches task list', async () => {
    const data = await TaskApi.list();
    expect(data.ok).toBeTruthy();
    expect(data.val).toEqual([
      {
        createdBy: 1,
        description: 'This is task 1',
        id: 1,
        isDone: false,
        path: '1',
        title: 'Task 1',
      },
      {
        createdBy: 1,
        description: 'This is task 2',
        id: 2,
        isDone: false,
        path: '2',
        title: 'Task 2',
      },
    ]);
  });
});
