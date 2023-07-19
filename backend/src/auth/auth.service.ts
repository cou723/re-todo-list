import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  userId: User['id'];
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

  // ユーザーを認証する
  async validateUser(
    name: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findOne(name); // DBからUserを取得

    // DBに保存されているpasswordはハッシュ化されている事を想定しているので、
    // bcryptなどを使ってパスワードを判定する
    if (user) {
      return;
    }
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { userId: user.id, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
