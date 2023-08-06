import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@/entity/user.entity';
import {
  AuthService,
  PasswordNotMatchError,
  UserNotFoundError,
} from './auth.service';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    name: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser> {
    try {
      const user = await this.authService.validateUser(name, pass);
      return user;
    } catch (e) {
      if (e instanceof UserNotFoundError)
        throw new UnauthorizedException(e.message);
      if (e instanceof PasswordNotMatchError)
        throw new UnauthorizedException(e.message);
      throw new UnauthorizedException();
    }
  }
}
