import 'module-alias/register';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { User } from '@/entity/user.entity';
import { TaskModule } from '@/task/task.module';
import { UserModule } from '@/user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    TaskModule,
    AuthModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '120s' },
        };
      },
    }),
    TypeOrmModule.forRoot({
      database: new ConfigService().get<string>('DB_FILE_PATH'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      type: 'sqlite',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
