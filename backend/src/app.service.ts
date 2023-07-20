import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly itemRepos: Repository<User>,
  ) {}

  async register(username, password) {
    return await this.itemRepos.save({
      username: username,
      password: bcrypt.hashSync(password),
    });
  }

  async delete(id: number) {
    return await this.itemRepos.delete({ id: id });
  }
}
