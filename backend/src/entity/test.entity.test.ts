import { getCurrentPath } from './task.entity';
test('get current path', () => {
  expect(
    getCurrentPath({
      id: 2,
      path: '1',
      title: '1',
      description: '1',
      isDone: false,
      createdBy: 1,
    }),
  ).toBe('1/2');
  expect(
    getCurrentPath({
      id: 2,
      path: '',
      title: '1',
      description: '1',
      isDone: false,
      createdBy: 1,
    }),
  ).toBe('2');
});
