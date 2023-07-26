import * as Factory from 'factory.ts';
import { TaskEntity } from '../../src/entity/task.entity';

export const userFactory = Factory.makeFactory<TaskEntity>({
  id: Factory.each((i) => i),
  title: 'title',
  description: 'description',
  isDone: false,
  createdBy: 1,
  path: '',
});
