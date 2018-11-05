import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'app/auth/shared/services/auth/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>,
    isLoggedInSpy: jasmine.Spy,
    routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const authService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'logoutUser'
    ]);
    isLoggedInSpy = authService.isLoggedIn;
    const router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component = fixture.componentInstance;
    authServiceSpy = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the brand', () => {
    it(`should have the title 'NGTrellone'`, () => {
      expect(element.querySelector('.navbar-brand').textContent).toEqual(
        'NGTrellone'
      );
    });
  });

  describe('the links', () => {});

  describe('the user area', () => {
    let logoutButtonElement: HTMLElement;

    beforeEach(() => {
      localStorage.clear();
    });

    describe('if the user is logged in', () => {
      beforeEach(() => {
        localStorage.setItem('username', 'Justin');
        isLoggedInSpy.and.returnValue(true);

        fixture.detectChanges();
        logoutButtonElement = element.querySelector('#logout-button');
      });

      it('should welcome the user', () => {
        const welcomeMessageElement = element.querySelector('#welcome-message');
        expect(welcomeMessageElement.textContent).toContain('Welcome, Justin');
      });

      it('should display a log out button', () => {
        expect(logoutButtonElement).toBeTruthy();
      });

      describe('the logout button', () => {
        it('when clicked should log the user out and navigate to the login url', () => {
          const loginUrl = '/auth/login';
          logoutButtonElement.click();

          expect(authServiceSpy.logoutUser).toHaveBeenCalled();
          expect(routerSpy.navigate).toHaveBeenCalledWith([loginUrl]);
        });
      });
    });

    describe('if the user is not logged in', () => {
      beforeEach(() => {
        isLoggedInSpy.and.returnValue(false);
        fixture.detectChanges();
      });

      it('should not welcome the user', () => {
        const welcomeMessageElement = element.querySelector('#welcome-message');
        expect(welcomeMessageElement).toBeFalsy();
      });

      it('should not display a log out button', () => {
        logoutButtonElement = element.querySelector('#logout-button');
        expect(logoutButtonElement).toBeFalsy();
      });
    });
  });
});
