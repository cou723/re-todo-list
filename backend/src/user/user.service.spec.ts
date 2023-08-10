import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserService } from './user.service';

import { User } from '@/entity/user.entity';

describe(' UserService', () => {
  let service: UserService;
  let mockRepos: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            delete: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepos = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('find one test', async () => {
    const users: User[] = [
      {
        id: 1,
        password: bcrypt.hashSync('test', 10),
        username: 'test',
      },
      {
        id: 2,
        password: bcrypt.hashSync('test2', 10),
        username: 'test2',
      },
    ];
    jest.spyOn(mockRepos, 'findOne').mockResolvedValueOnce(users[0]);

    const result = await service.findOne('test');
    expect(result).toEqual(users[0]);
  });

  it('register test', async () => {
    const username = 'test';
    const password = 'password';
    const hashedPassword = 'hashedPassword';

    jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);
    jest
      .spyOn(mockRepos, 'save')
      .mockResolvedValueOnce({ id: 0, password: hashedPassword, username });

    const result = await service.register(username, password);

    expect(result).toEqual({ id: 0, password: hashedPassword, username });
    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 10);
    expect(mockRepos.save).toHaveBeenCalledWith({
      password: hashedPassword,
      username,
    });
  });
});
