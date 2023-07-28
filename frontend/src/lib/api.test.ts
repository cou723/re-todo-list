import jsonServer from 'json-server';
import { type Server } from 'http';
import TaskApi from './api';

describe('Task Api', () => {
  let server: Server;
  beforeAll(() => {
    // Json-server の起動
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
    // Json-server の停止
    server.close();
  });

  it('fetches user data', async () => {
    const data = await TaskApi.get(1);
    expect(data.ok).toBeTruthy();
    expect(data.val).toEqual({
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      createdBy: 1,
      path: '',
      isDone: false,
    });
  });

  it('fetches task list', async () => {
    const data = await TaskApi.list();
    expect(data.ok).toBeTruthy();
    expect(data.val).toEqual([
      {
        id: 1,
        title: 'Task 1',
        description: 'This is task 1',
        createdBy: 1,
        path: '',
        isDone: false,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'This is task 2',
        createdBy: 1,
        path: '',
        isDone: false,
      },
    ]);
  });
});
