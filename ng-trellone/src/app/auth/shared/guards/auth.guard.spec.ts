import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard,
    routerSpy: jasmine.SpyObj<Router>,
    authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    authGuard = TestBed.get(AuthGuard);
    routerSpy = TestBed.get(Router);
    authServiceSpy = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('.canActivate', () => {
    it('should return true if the user is logged in', () => {
      authServiceSpy.isLoggedIn.and.returnValue(true);
      const result = authGuard.canActivate();
      expect(result).toBe(true);
    });

    it('should navigate to the /auth/login route if the user is not logged in', () => {
      const loginRoute = '/auth/login';
      authServiceSpy.isLoggedIn.and.returnValue(false);

      const result = authGuard.canActivate();

      expect(routerSpy.navigate.calls.count()).toEqual(
        1,
        'only calls navigate once'
      );
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe(
        loginRoute,
        'the route navigated to is correct'
      );
      expect(result).toBe(false, 'returned false');
    });
  });
});
