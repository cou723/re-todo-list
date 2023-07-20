import {
  Controller,
  Delete,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { PasswordOmitUser, User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Post('logout')
  logout() {
    return 'logout is not implemented yet. We plan to implement a blacklist in the near future';
  }

  @Post('register')
  register(@Body() req: { user: User }) {
    return this.appService.register(req.user.username, req.user.password);
  }

  @UseGuards(AuthGuard('jtw'))
  @Delete('delete')
  delete(@Request() req: { user: PasswordOmitUser }) {
    return this.appService.delete(req.user.id);
  }
}
