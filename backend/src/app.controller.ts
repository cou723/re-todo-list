import {
  Controller,
  Delete,
  Post,
  UseGuards,
  Req,
  Body,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordOmitUser } from './entity/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './register.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: { user: PasswordOmitUser },
  ) {
    res.cookie('accessToken', this.authService.login(req.user), {
      httpOnly: true,
    });
    return;
  }

  @Post('logout')
  logout() {
    return 'logout is not implemented yet. We plan to implement a blacklist in the near future';
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() user: RegisterDto) {
    return this.userService.register(user.username, user.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('user')
  delete(@Req() req: { user: PasswordOmitUser }) {
    return this.userService.delete(req.user.id);
  }
}
