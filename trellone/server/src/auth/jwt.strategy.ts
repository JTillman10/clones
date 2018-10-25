import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UsernamePasswordCombination } from '../interfaces/username-password-combination';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(usernamePasswordCombination: UsernamePasswordCombination) {
    const user = await this.authService.validateUser(
      usernamePasswordCombination,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
