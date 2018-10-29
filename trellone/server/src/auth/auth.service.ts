import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtPayload } from './dtos/jwtPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async authenticate(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Unknown email address');
    }

    const match = await this.usersService.compareHash(
      loginDto.password,
      user.password,
    );

    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(loginDto);
    return {
      expiresIn: 3600,
      accessToken,
      user,
    };
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    return await this.usersService.findOneById(jwtPayload.id);
  }
}
