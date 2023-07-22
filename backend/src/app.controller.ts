import {
  Controller,
  Delete,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordOmitUser, User } from './entity/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './register.dto';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  async login(@Request() req: { user: PasswordOmitUser }) {
    return this.authService.login(req.user);
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
  delete(@Request() req: { user: PasswordOmitUser }) {
    return this.userService.delete(req.user.id);
  }
}
