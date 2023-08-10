import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';

import { AuthService, PasswordNotMatchError, UserNotFoundError } from './auth.service';

import { User } from '@/entity/user.entity';

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
        password: hashedPassword,
        username: 'hoge',
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
        password: bcrypt.hashSync('hoge', 10),
        username: 'hoge',
      },
    ];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(users[0]);

    void expect(service.validateUser('hoge', 'wrong_password')).rejects.toThrow(
      PasswordNotMatchError
    );
  });

  it('validate user wrong username', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

    void expect(service.validateUser('wrong username', 'hoge')).rejects.toThrow(UserNotFoundError);
  });
});
