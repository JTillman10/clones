import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AuthResult } from '../../interfaces/auth-result.interface';
import { NewUser } from '../../interfaces/new-user.interface';

import * as moment from 'moment';

const testSetSession = (dummyResult, dummyUser) => {
  expect(localStorage.getItem('access_token')).toBe(
    dummyResult.accessToken,
    'access token set'
  );
  expect(localStorage.getItem('expires_at').slice(0, -2)).toBe(
    JSON.stringify(
      moment()
        .add(dummyResult.expiresIn, 'second')
        .valueOf()
    ).slice(0, -2),
    'expires at set'
  );
  expect(localStorage.getItem('username')).toBe(
    dummyUser.username,
    'username set'
  );
  expect(localStorage.getItem('user_id')).toBe(
    dummyResult.user._id,
    'user id set'
  );
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('.createUser', () => {
    let dummyUser: NewUser, dummyResult: AuthResult;

    beforeEach(() => {
      dummyUser = {
        email: 'fakeEmail',
        password: 'fakePassword',
        username: 'fakeUsername'
      };

      dummyResult = {
        expiresIn: 1,
        accessToken: '12345',
        user: Object.assign(dummyUser, { name: 'fakeName', _id: 'fakeId' })
      };
    });

    it('should return an Observable<AuthResult>', () => {
      authService.createUser(dummyUser).subscribe(result => {
        expect(result).toEqual(dummyResult);
      });

      const request = httpMock.expectOne(`${authService.authUrl}/register`);
      request.flush(dummyResult);
    });

    it('should call setSession', () => {
      authService.createUser(dummyUser).subscribe(result => {
        expect(result).toEqual(dummyResult);
      });

      const request = httpMock.expectOne(`${authService.authUrl}/register`);
      request.flush(dummyResult);

      testSetSession(dummyResult, dummyUser);
    });

    it('should call the register url with a POST and correct body', () => {
      authService.createUser(dummyUser).subscribe();

      const request = httpMock.expectOne(`${authService.authUrl}/register`);
      expect(request.request.method).toBe('POST', 'HTTP method is POST');
      expect(request.request.body).toBe(dummyUser, 'correct user returned');
      request.flush(dummyResult);
    });
  });

  describe('.loginUser', () => {
    let dummyUser: NewUser, dummyResult: AuthResult;
    beforeEach(() => {
      dummyUser = {
        email: 'fakeEmail',
        password: 'fakePassword',
        username: 'fakeUsername'
      };

      dummyResult = {
        expiresIn: 1,
        accessToken: '12345',
        user: Object.assign(dummyUser, { name: 'fakeName', _id: 'fakeId' })
      };
    });

    it('should return an Observable<AuthResult>', () => {
      authService
        .loginUser(dummyUser.email, dummyUser.password)
        .subscribe(result => {
          expect(result).toEqual(dummyResult);
        });

      const request = httpMock.expectOne(`${authService.authUrl}/login`);
      request.flush(dummyResult);
    });

    it('should call setSession', () => {
      authService.loginUser(dummyUser.email, dummyUser.password).subscribe();

      const request = httpMock.expectOne(`${authService.authUrl}/login`);
      request.flush(dummyResult);

      testSetSession(dummyResult, dummyUser);
    });

    it('should call the login url with a POST', () => {
      authService.loginUser(dummyUser.email, dummyUser.password).subscribe();

      const request = httpMock.expectOne(`${authService.authUrl}/login`);
      expect(request.request.method).toBe('POST');
      request.flush(dummyResult);
    });
  });

  describe('.logoutUser', () => {
    it('should remove all authentication items from local storage', () => {
      localStorage.setItem('access_token', 'fakeAccessToken');
      localStorage.setItem('expires_at', 'fakeExpiresAt');
      localStorage.setItem('username', 'fakeUsername');
      localStorage.setItem('user_id', 'fakeUserId');

      authService.logoutUser();

      expect(localStorage.getItem('access_token')).toBeNull(
        'access token removed'
      );
      expect(localStorage.getItem('expires_at')).toBeNull('expires at removed');
      expect(localStorage.getItem('username')).toBeNull('username removed');
      expect(localStorage.getItem('user_id')).toBeNull('user id removed');
    });
  });

  describe('.isLoggedIn', () => {
    const currentTimeAndDate = moment();

    it('should return true if getExpiration is not before current date/time', () => {
      spyOn(authService, 'getExpiration').and.returnValue(
        currentTimeAndDate.add(2, 'second')
      );
      expect(authService.isLoggedIn()).toBe(true);
    });

    it('should return false if getExpiration is before current date/time', () => {
      spyOn(authService, 'getExpiration').and.returnValue(
        currentTimeAndDate.subtract(1, 'second')
      );
      expect(authService.isLoggedIn()).toBe(false);
    });
  });

  describe('.isLoggedOut', () => {
    it('should return true if isLoggedIn returns false', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(false);
      expect(authService.isLoggedOut()).toBe(true);
    });

    it('should return false if isLoggedIn returns true', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(true);
      expect(authService.isLoggedOut()).toBe(false);
    });
  });

  describe('.getExpiration', () => {
    it('should return the parsed localStorage value for expires_at', () => {
      localStorage.setItem('expires_at', '12345');
      expect(authService.getExpiration()).toEqual(moment(JSON.parse('12345')));
    });
  });

  describe('.getCurrentUserId', () => {
    it('should return the localStorage value for user_id', () => {
      localStorage.setItem('current_user_id', 'fakeUserId');
      expect(authService.getCurrentUserId()).toBe('fakeUserId');
    });
  });
});
