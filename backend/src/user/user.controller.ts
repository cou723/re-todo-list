import { Controller, Post, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('create')
  createUser() {
    return 'create user';
  }
  @Delete()
  deleteUser() {
    return 'delete user';
  }
}
