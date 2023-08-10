import { Task } from 'common';
test('get current path', () => {
  expect(
    Task.fromObject({
      createdBy: 1,
      description: '1',
      id: 2,
      isDone: false,
      path: '1',
      title: '1',
    }).getCurrentPath()
  ).toBe('1/2');

  expect(
    Task.fromObject({
      createdBy: 1,
      description: '1',
      id: 2,
      isDone: false,
      path: '',
      title: '1',
    }).getCurrentPath()
  ).toBe('2');
});
