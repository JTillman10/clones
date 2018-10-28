import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewUser } from '../../interfaces/new-user.interface';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input()
  type: String;

  @Output()
  submitted = new EventEmitter<NewUser>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.formValid) {
      const newUser = {
        email: this.form.get('email').value,
        username: this.form.get('username').value,
        password: this.form.get('password').value
      };
      this.submitted.emit(newUser);
    }
  }

  get registering() {
    return this.type === 'registering';
  }

  get formValid() {
    return this.form.valid;
  }

  get passwordRequired() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get usernameRequired() {
    const control = this.form.get('username');
    return control.hasError('required') && control.touched;
  }

  get emailRequired() {
    const control = this.form.get('email');
    return control.hasError('required') && control.touched;
  }

  get emailFormatInvalid() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  fieldValid(field) {
    return this.form.get(field).valid;
  }

  fieldInvalid(field) {
    const control = this.form.get(field);
    return !control.valid && control.touched;
  }
}
