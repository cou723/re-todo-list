import * as Factory from 'factory.ts';
import { Task } from '../../src/entity/task.entity';

export const userFactory = Factory.makeFactory<Task>({
  id: Factory.each((i) => i),
  title: 'title',
  description: 'description',
  isDone: false,
  createdBy: 1,
  path: '',
});
