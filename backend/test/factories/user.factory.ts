import * as Factory from 'factory.ts';
import bcrypt from 'bcrypt';
import { User } from '../../src/user/user.entity';

export const userFactory = Factory.makeFactory<User>({
  id: Factory.each((i) => i),
  username: 'test',
  password: bcrypt.hashSync('test', 1),
});
