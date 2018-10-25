import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const accessToken = this.jwtService.sign(loginDto);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(loginDto: LoginDto): Promise<any> {
    // use passport authenticate?
    return await this.usersService.findOneByUsernameAndPassword(loginDto);
  }
}
