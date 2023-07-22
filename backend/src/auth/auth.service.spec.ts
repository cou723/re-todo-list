import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import {
  AuthService,
  PasswordNotMatchError,
  UserNotFoundError,
} from './auth.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('validate user test', async () => {
    const hashedPassword = bcrypt.hashSync('hoge', 10);
    const users: User[] = [
      {
        id: 1,
        username: 'hoge',
        password: hashedPassword,
      },
    ];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(users[0]);

    expect(await service.validateUser('hoge', 'hoge')).toEqual({
      id: 1,
      username: 'hoge',
    });
  });

  it('validate user wrong password', async () => {
    const users: User[] = [
      {
        id: 1,
        username: 'hoge',
        password: bcrypt.hashSync('hoge', 10),
      },
    ];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(users[0]);

    expect(service.validateUser('hoge', 'wrong_password')).rejects.toThrow(
      PasswordNotMatchError,
    );
  });

  it('validate user wrong username', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

    expect(service.validateUser('wrong username', 'hoge')).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
