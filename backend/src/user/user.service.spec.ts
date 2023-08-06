import { Repository } from 'typeorm';
import { User } from '@/entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
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
        username: 'test',
        password: bcrypt.hashSync('test', 10),
      },
      {
        id: 2,
        username: 'test2',
        password: bcrypt.hashSync('test2', 10),
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
      .mockResolvedValueOnce({ id: 0, username, password: hashedPassword });

    const result = await service.register(username, password);

    expect(result).toEqual({ id: 0, username, password: hashedPassword });
    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 10);
    expect(mockRepos.save).toHaveBeenCalledWith({
      username,
      password: hashedPassword,
    });
  });
});
