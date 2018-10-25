import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from 'users/interfaces/user.interface';
import { UsernamePasswordCombination } from '../interfaces/username-password-combination';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() usernamePasswordCombination: UsernamePasswordCombination,
  ) {
    return await this.authService.login(usernamePasswordCombination);
  }
}
