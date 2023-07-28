import endpoints from './endpoints';
describe('endpoints', () => {
  it('service', () => {
    expect(endpoints.login).toEqual('http://localhost:8000/login');
    expect(endpoints.logout).toEqual('http://localhost:8000/logout');
    expect(endpoints.user).toEqual('http://localhost:8000/user');
    expect(endpoints.register).toEqual('http://localhost:8000/register');
  });

  it('task', () => {
    expect(endpoints.task.base).toEqual('http://localhost:8000/task');
    expect(endpoints.task.list).toEqual('http://localhost:8000/task/list');
    expect(endpoints.task.one(1)).toEqual('http://localhost:8000/task/1');
    expect(endpoints.task.done(1)).toEqual('http://localhost:8000/task/1/done');
    expect(endpoints.task.undone(1)).toEqual(
      'http://localhost:8000/task/1/undone',
    );
    expect(endpoints.task.parent(1)).toEqual(
      'http://localhost:8000/task/1/parent',
    );
  });
});
