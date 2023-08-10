import { Task } from 'common';
test('get current path', () => {
  expect(
    Task.fromObject({
      id: 2,
      path: '1',
      title: '1',
      description: '1',
      isDone: false,
      createdBy: 1,
    }).getCurrentPath(),
  ).toBe('1/2');

  expect(
    Task.fromObject({
      id: 2,
      path: '',
      title: '1',
      description: '1',
      isDone: false,
      createdBy: 1,
    }).getCurrentPath(),
  ).toBe('2');
});
