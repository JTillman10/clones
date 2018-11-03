import { Input, Component, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NewUser } from '../../..//shared/interfaces/new-user.interface';
import { AuthResult } from 'app/auth/shared/interfaces/auth-result.interface';
import { AuthFormComponent } from 'app/auth/shared/components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>,
    createUserSpy: jasmine.Spy,
    routerSpy: jasmine.SpyObj<Router>;

  // @Component({ selector: 'auth-form', template: '' })
  // class AuthFormStubComponent {
  //   @Input()
  //   type;
  //   @Output()
  //   submitted = new EventEmitter<string>();
  // }

  beforeEach(async(() => {
    const authService = jasmine.createSpyObj('AuthService', ['createUser']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    createUserSpy = authService.createUser.and.returnValue(of('test'));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent, AuthFormComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    const expectedTitle = 'Register';
    const expectedLinkText = 'Already have an account?';
    const expectedButtonText = 'Register';

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

  describe('#registerUser', () => {
    let fakeNewUser: NewUser, fakeAuthResult: AuthResult, q$;

    describe('when observable resolves', () => {
      beforeEach(() => {
        fakeNewUser = {
          email: 'fakeEmail',
          username: 'fakeUsername',
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
        createUserSpy.and.returnValue(q$);
        component.registerUser(fakeNewUser);
        getTestScheduler().flush();
      });

      it('should call #authService.createUser', () => {
        expect(createUserSpy.calls.any()).toBe(true);
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
      createUserSpy.and.returnValue(q$);
      component.registerUser(fakeNewUser);
      getTestScheduler().flush();

      fixture.detectChanges();
      const errorElement = element.querySelector('.error');
      expect(errorElement.textContent).toMatch(/test failure/);
    });
  });
});
