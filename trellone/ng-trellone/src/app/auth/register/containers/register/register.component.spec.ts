import { Input, Component, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NewUser } from '../../..//shared/interfaces/new-user.interface';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService, router;
  let authServiceSpy, createUserSpy, routerSpy;

  @Component({ selector: 'auth-form', template: '' })
  class AuthFormStubComponent {
    @Input()
    type;
    @Output()
    submitted = new EventEmitter<string>();
  }

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['createUser']);
    createUserSpy = authService.createUser.and.returnValue(of('test'));
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent, AuthFormStubComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#registerUser', () => {
    beforeEach(() => {
      const fakeNewUser: NewUser = {
        email: 'fakeEmail',
        username: 'fakeUsername',
        password: 'fakePassword'
      };

      component.registerUser(fakeNewUser);
    });

    it('should call #authService.createUser', () => {
      expect(createUserSpy.calls.any()).toBe(true);
    });

    it('should navigate to the baseRoute', () => {
      const baseRoute = '/';
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe(baseRoute);
    });
  });
});
