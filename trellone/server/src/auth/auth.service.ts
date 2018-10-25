import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsernamePasswordCombination } from '../interfaces/username-password-combination';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(usernamePasswordCombination: UsernamePasswordCombination) {
    const accessToken = this.jwtService.sign(usernamePasswordCombination);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(
    usernamePasswordCombination: UsernamePasswordCombination,
  ): Promise<any> {
    // use passport authenticate?
    return await this.usersService.findOneByUsernameAndPassword(
      usernamePasswordCombination,
    );
  }
}
