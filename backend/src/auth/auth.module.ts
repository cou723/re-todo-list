import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

// Strategyクラス
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '120s' },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
