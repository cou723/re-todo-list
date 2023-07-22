import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
type PasswordOmitUser = Omit<User, 'password'>;

export class AuthError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UserNotFoundError extends AuthError {
  constructor() {
    super('user not found');
  }
}

export class PasswordNotMatchError extends AuthError {
  constructor() {
    super('password not match');
  }
}

interface JWTPayload {
  id: User['id'];
  username: User['username'];
}
/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async validateUser(
    name: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser> {
    const user = await this.usersService.findOne(name);

    if (!user) throw new UserNotFoundError();
    if (!bcrypt.compareSync(pass, user.password))
      throw new PasswordNotMatchError();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userOmitPassword } = user;
    return userOmitPassword;
  }

  async login(user: PasswordOmitUser) {
    const payload: JWTPayload = { id: user.id, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
