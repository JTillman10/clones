import { Injectable } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { NewUser } from '../../interfaces/new-user.interface';

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  constructor() {}

  createUser(newUser: NewUser) {
    console.log('Registering...');
    console.log('New user: ', newUser);
  }

  loginUser(email: string, password: string) {
    console.log('Logging in...');
    console.log('Email: ', email);
    console.log('Password: ', password);
  }
}
