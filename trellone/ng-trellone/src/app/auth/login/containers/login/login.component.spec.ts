import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';
import { UserToAuthenticate } from 'app/auth/shared/interfaces/user-to-authenticate';
import { AuthResult } from 'app/auth/shared/interfaces/auth-result.interface';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>,
    loginUserSpy: jasmine.Spy,
    routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const authService = jasmine.createSpyObj('AuthService', ['loginUser']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    loginUserSpy = authService.loginUser.and.returnValue(of('test'));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent, AuthFormComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    element = fixture.nativeElement;
    component = fixture.componentInstance;
    authServiceSpy = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct content projection', () => {
    const expectedTitle = 'Log in';
    const expectedLinkText = 'Not registered?';
    const expectedButtonText = 'Log in';

    const titleElement = element.querySelector('.auth-form-title');
    const linkElement = element.querySelector('p a');
    const buttonElement = element.querySelector('.auth-form-button');

    expect(titleElement.textContent).toContain(expectedTitle, 'title');
    expect(linkElement.textContent).toContain(expectedLinkText, 'link text');
    expect(buttonElement.textContent).toContain(
      expectedButtonText,
      'button text'
    );
  });

  it('should navigate when clikcing on the link', () => {
    const linkElement = element.querySelector('p a');
    // clicking on the 'a' navigates (for register too)
    // test when RouterTestingModule documentation is available
  });

  describe('#loginUser', () => {
    let fakeUserToAuthenticate: UserToAuthenticate,
      fakeAuthResult: AuthResult,
      q$;

    describe('when observable resolves', () => {
      beforeEach(() => {
        fakeUserToAuthenticate = {
          email: 'fakeEmail',
          password: 'fakePassword'
        };

        fakeAuthResult = {
          accessToken: 'fakeAccessToken',
          expiresIn: 0,
          user: {
            _id: 'fakeId',
            email: 'fakeEmail',
            username: 'fakeUsername',
            name: 'fakeName',
            password: 'fakePassword'
          }
        };

        q$ = cold('---x|', { x: fakeAuthResult });
        loginUserSpy.and.returnValue(q$);
        component.loginUser(fakeUserToAuthenticate);
        getTestScheduler().flush();
      });

      it('should call #authService.loginUserSpy', () => {
        expect(loginUserSpy.calls.any()).toBe(true);
      });

      it('should navigate to the baseRoute', () => {
        const baseRoute = '/';
        expect(routerSpy.navigate.calls.first().args[0][0]).toBe(baseRoute);
      });
    });

    it('should set #errors with the returned error if #authService.createUser errors', () => {
      q$ = cold('---#|', null, {
        error: { message: 'AuthService test failure' }
      });
      loginUserSpy.and.returnValue(q$);
      component.loginUser(fakeUserToAuthenticate);
      getTestScheduler().flush();

      fixture.detectChanges();
      const errorElement = element.querySelector('.error');
      expect(errorElement.textContent).toMatch(/test failure/);
    });
  });
});
