import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { Config } from '../config';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller(`${Config.preUrl}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.authService.authenticate(loginDto);
  }
}
