import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { EventEmitter, DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { NewUser } from '../../interfaces/new-user.interface';

describe('AuthFormComponent', () => {
  describe('without test host', () => {
    let component: AuthFormComponent;
    let fixture: ComponentFixture<AuthFormComponent>;
    let nativeElement, debugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [AuthFormComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AuthFormComponent);
      nativeElement = fixture.nativeElement;
      debugElement = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('the email field', () => {
      let emailField: AbstractControl;
      let emailElement: HTMLInputElement;

      beforeEach(() => {
        emailField = component.form.get('email');
        emailElement = nativeElement.querySelector('#email');
      });

      it('should be bound to an input field', () => {
        expect(emailElement.getAttribute('formControlName')).toBe('email');
      });

      it('should exist on the #form object', () => {
        expect(emailField).toBeTruthy();
      });

      describe('when null', () => {
        it('should be invalid on the #form', () => {
          expect(emailField.hasError('required')).toBe(true);
        });

        describe('and touched', () => {
          beforeEach(() => {
            emailElement.value = null;
            emailElement.dispatchEvent(new Event('input'));
            emailField.markAsTouched();
            fixture.detectChanges();
          });

          it('should display correct styling', () => {
            expect(emailElement.classList).toContain('is-danger');
            expect(
              nativeElement.querySelector('#email-icon').classList
            ).toContain('has-text-danger');
            expect(nativeElement.querySelector('#email-check')).toBeNull();
            expect(
              nativeElement.querySelector('#email-warning').classList
            ).toContain('has-text-danger');
          });

          it('should display an error message', () => {
            const emailRequiredMessage = fixture.nativeElement.querySelector(
              '#email-required'
            );

            expect(emailRequiredMessage).not.toBeNull();
            expect(emailRequiredMessage.classList).toContain('is-danger');
          });
        });
      });

      describe('when invalid format', () => {
        it('should be invalid on the #form', () => {
          emailElement.value = 'abc';
          emailElement.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(emailField.hasError('email')).toBe(true);
        });

        describe('and touched', () => {
          beforeEach(() => {
            emailElement.value = 'abc';
            emailElement.dispatchEvent(new Event('input'));
            emailField.markAsTouched();
            fixture.detectChanges();
          });

          it('should display correct styling when required invalid', () => {
            expect(emailElement.classList).toContain('is-danger');
            expect(
              nativeElement.querySelector('#email-icon').classList
            ).toContain('has-text-danger');
            expect(nativeElement.querySelector('#email-check')).toBeNull();
            expect(
              nativeElement.querySelector('#email-warning').classList
            ).toContain('has-text-danger');
          });

          it('should display an error message', () => {
            const emailFormatInvalidMessage = fixture.nativeElement.querySelector(
              '#email-format-invalid'
            );

            expect(emailFormatInvalidMessage).not.toBeNull('format');
            expect(emailFormatInvalidMessage.classList).toContain('is-danger');
          });
        });
      });
    });

    describe('the password field', () => {
      let passwordField: AbstractControl;
      let passwordElement: HTMLInputElement;

      beforeEach(() => {
        passwordField = component.form.get('password');
        passwordElement = nativeElement.querySelector('#password');
      });

      it('should be bound to an input field', () => {
        expect(passwordElement.getAttribute('formControlName')).toBe(
          'password'
        );
      });

      it('should exist on the #form object', () => {
        expect(passwordField).toBeTruthy();
      });

      describe('when null', () => {
        it('should be invalid on the #form', () => {
          expect(passwordField.hasError('required')).toBe(true);
        });

        describe('and touched', () => {
          beforeEach(() => {
            passwordElement.value = null;
            passwordElement.dispatchEvent(new Event('input'));
            passwordField.markAsTouched();
            fixture.detectChanges();
          });

          it('should display correct styling', () => {
            expect(passwordElement.classList).toContain('is-danger');
            expect(
              nativeElement.querySelector('#password-icon').classList
            ).toContain('has-text-danger');
            expect(nativeElement.querySelector('#password-check')).toBeNull();
            expect(
              nativeElement.querySelector('#password-warning').classList
            ).toContain('has-text-danger');
          });

          it('should display an error message', () => {
            const passwordRequiredMessage = fixture.nativeElement.querySelector(
              '#password-required'
            );

            expect(passwordRequiredMessage).not.toBeNull();
            expect(passwordRequiredMessage.classList).toContain('is-danger');
          });
        });
      });
    });

    describe('when #type is registering', () => {
      beforeEach(() => {
        component.type = 'registering';
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should have email, username and password fields', () => {
        expect(component.form.get('email')).not.toBeNull();
        expect(component.form.get('username')).not.toBeNull();
        expect(component.form.get('password')).not.toBeNull();
      });

      describe('the username field', () => {
        let usernameField: AbstractControl;
        let usernameElement: HTMLInputElement;

        beforeEach(() => {
          usernameField = component.form.get('username');
          usernameElement = nativeElement.querySelector('#username');
        });

        it('should be bound to an input field', () => {
          expect(usernameElement.getAttribute('formControlName')).toBe(
            'username'
          );
        });

        it('should exist on the #form object', () => {
          expect(usernameField).toBeTruthy();
        });

        describe('when null', () => {
          it('should be invalid on the #form', () => {
            expect(usernameField.hasError('required')).toBe(true);
          });

          describe('and touched', () => {
            beforeEach(() => {
              usernameElement.value = null;
              usernameElement.dispatchEvent(new Event('input'));
              usernameField.markAsTouched();
              fixture.detectChanges();
            });

            it('should display correct styling', () => {
              expect(usernameElement.classList).toContain('is-danger');
              expect(
                nativeElement.querySelector('#username-icon').classList
              ).toContain('has-text-danger');
              expect(nativeElement.querySelector('#username-check')).toBeNull();
              expect(
                nativeElement.querySelector('#username-warning').classList
              ).toContain('has-text-danger');
            });

            it('should display an error message', () => {
              const usernameRequiredMessage = fixture.nativeElement.querySelector(
                '#username-required'
              );

              expect(usernameRequiredMessage).not.toBeNull();
              expect(usernameRequiredMessage.classList).toContain('is-danger');
            });
          });
        });
      });
    });

    describe('when #type is not registering', () => {
      it('should only have two form groups', () => {});
    });

    describe('the submit button', () => {
      let submitButtonElement: HTMLElement;
      let formElement: DebugElement;

      beforeEach(() => {
        submitButtonElement = nativeElement.querySelector('.button');
        formElement = debugElement.query(By.css('form'));
        component.submitted = new EventEmitter<NewUser>();
        fixture.detectChanges();
      });

      describe('when the form is valid', () => {
        describe('and the button is clicked', () => {
          it('should raise #submitted event', () => {
            const expectedUser = {
              email: 'fakeEmail@valid.com',
              password: 'fakePassword'
            };

            component.form.get('email').setValue(expectedUser.email);
            component.form.get('password').setValue(expectedUser.password);
            fixture.detectChanges();

            let savedUser;
            component.submitted.subscribe(newUser => (savedUser = newUser));

            formElement.triggerEventHandler('ngSubmit', null);
            expect(savedUser).toEqual(expectedUser);
          });

          it('should raise #submitted event with username property if registering', () => {
            const expectedUser = {
              email: 'fakeEmail@valid.com',
              username: 'fakeUsername',
              password: 'fakePassword'
            };

            component.type = 'registering';
            component.ngOnInit();
            fixture.detectChanges();

            component.form.get('email').setValue(expectedUser.email);
            component.form.get('username').setValue(expectedUser.username);
            component.form.get('password').setValue(expectedUser.password);
            fixture.detectChanges();

            let savedUser;
            component.submitted.subscribe(newUser => (savedUser = newUser));

            formElement.triggerEventHandler('ngSubmit', null);
            expect(savedUser).toEqual(expectedUser);
          });
        });
      });

      describe('when the form is invalid', () => {
        it('should be disabled', () => {
          expect(submitButtonElement.hasAttribute('disabled')).toBeTruthy();
        });
      });
    });
  });

  describe('with test host', () => {
    const expectedTitle = 'Fake Title';
    const expectedLinkText = 'Fake Link Text';
    const expectedButtonText = 'Fake Button Text';

    @Component({
      template: `
        <auth-form [type]="type" (submitted)="onSubmitted($event)">
          <span class="auth-form-title">${expectedTitle}</span>
          <a routerLink="/auth/login">${expectedLinkText}</a>
          <span class="auth-form-button">${expectedButtonText}</span>
        </auth-form>
      `
    })
    class TestHostComponent {
      type = 'registering';
      newUser: NewUser;
      onSubmitted(newUser: NewUser) {
        this.newUser = newUser;
      }
    }

    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let debugElement: DebugElement;
    let formElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [AuthFormComponent, TestHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      fixture.detectChanges();

      debugElement = fixture.debugElement;
      formElement = debugElement.query(By.css('form'));
    }));

    it('should display the correct content projection', () => {
      const titleElement = fixture.nativeElement.querySelector(
        '.auth-form-title'
      );
      const linkElement = fixture.nativeElement.querySelector('p a');
      const buttonElement = fixture.nativeElement.querySelector(
        '.auth-form-button'
      );

      expect(titleElement.textContent).toContain(expectedTitle, 'title');
      expect(linkElement.textContent).toContain(expectedLinkText, 'link text');
      expect(buttonElement.textContent).toContain(
        expectedButtonText,
        'button text'
      );
    });
  });
});
