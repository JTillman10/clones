import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { Config } from '../config';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller(`${Config.preUrl}/auth`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.authService.authenticate(loginDto);
  }

  @Post('register')
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
