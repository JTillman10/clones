import { User } from 'app/core/interfaces/user.interface';

export class AuthResult {
  expiresIn: number;
  accessToken: string;
  user: User;
}
