// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.headers.cookie) {
      const params = req.headers.cookie.split(';');
      if (params == undefined) return null;
      const token = params
        .map((t) => t.split('='))
        .filter((t) => t[0] == 'accessToken');
      if (token == undefined || token.length != 1 || token[0].length != 2)
        return null;
      return token[0][1];
    }
    return null;
  }

  async validate(payload: Omit<User, 'password'>) {
    return { id: payload.id, username: payload.username };
  }
}
