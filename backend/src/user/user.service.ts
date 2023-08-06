import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/entity/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepos: Repository<User>,
  ) {}

  async findOne(username: User['username']): Promise<User | null> {
    return await this.userRepos.findOne({ where: { username } });
  }

  async register(username, password) {
    if (await this.findOne(username))
      throw new HttpException('User already exists', 409);
    return await this.userRepos.save({
      username: username,
      password: bcrypt.hashSync(password, 10),
    });
  }

  async delete(id: number) {
    await this.userRepos.delete({ id: id });
  }
}
