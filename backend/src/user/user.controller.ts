import { Controller, Post, Delete, Body } from '@nestjs/common';
import { LoginDto } from './login_dto';

@Controller('user')
export class UserController {
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    loginDto.username;
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
