import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { shareReplay, tap, catchError } from 'rxjs/operators';
import * as moment from 'moment';

// import { environment } from '../../../../../environments/environment';
import { environment } from 'environment';
import { Store } from 'store';

import { SharedModule } from '../../shared.module';
import { NewUser } from '../../interfaces/new-user.interface';
import { AuthResult } from '../../interfaces/auth-result.interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  authUrl: String = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient, private store: Store) {}

  createUser(newUser: NewUser) {
    return this.http.post<NewUser>(`${this.authUrl}/register`, newUser).pipe(
      shareReplay(),
      catchError(error => throwError(error))
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

    this.store.set('user', null);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResult: AuthResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.store.set('user', authResult.user);
  }

  getExpiration() {
    const expiration = localStorage.getIntem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getCurrentUserId() {
    return localStorage.getItem('current_user_id');
  }
}
