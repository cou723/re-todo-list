import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepos: Repository<User>,
  ) {}

  async findOne(username: User['username']): Promise<User | undefined> {
    return await this.userRepos.findOne({ where: { username } });
  }
}
