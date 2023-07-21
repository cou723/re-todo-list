import {
  Controller,
  Delete,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordOmitUser, User } from './user/user.entity';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}
  @Post('logout')
  logout() {
    return 'logout is not implemented yet. We plan to implement a blacklist in the near future';
  }

  @Post('register')
  register(@Body() req: { user: User }) {
    return this.userService.register(req.user.username, req.user.password);
  }

  @UseGuards(AuthGuard('jtw'))
  @Delete('delete')
  delete(@Request() req: { user: PasswordOmitUser }) {
    return this.userService.delete(req.user.id);
  }
}
