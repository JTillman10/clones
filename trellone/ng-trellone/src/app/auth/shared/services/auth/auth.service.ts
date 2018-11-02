import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'environment';

import { SharedModule } from '../../shared.module';
import { NewUser } from '../../interfaces/new-user.interface';
import { AuthResult } from '../../interfaces/auth-result.interface';

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  authUrl: String = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  createUser(newUser: NewUser) {
    return this.http.post<AuthResult>(`${this.authUrl}/register`, newUser).pipe(
      shareReplay(),
      tap(
        authResult => this.setSession(authResult),
        error => {
          throw error;
        }
      )
    );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResult>(`${this.authUrl}/login`, {
        email,
        password
      })
      .pipe(
        shareReplay(),
        tap(
          authResult => this.setSession(authResult),
          error => {
            throw error;
          }
        )
      );
  }

  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  }

  isLoggedIn() {
    if (moment().isBefore(this.getExpiration())) {
      return true;
    } else {
      this.logoutUser();
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResult: AuthResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', authResult.user.username);
    localStorage.setItem('user_id', authResult.user._id);
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getCurrentUserId() {
    return localStorage.getItem('current_user_id');
  }
}
