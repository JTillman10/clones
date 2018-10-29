import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { NewUser } from '../../interfaces/new-user.interface';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input()
  type: String;

  @Output()
  submitted = new EventEmitter<NewUser>();

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.registering) {
      this.form.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    }
  }

  onSubmit() {
    if (this.formValid) {
      const newUser: any = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      };
      if (this.registering) {
        newUser.username = this.form.get('username').value;
      }
      this.submitted.emit(newUser);
    }
  }

  get registering() {
    return this.type === 'registering';
  }

  get formValid() {
    return this.form.valid;
  }

  // TODO: refactor these methods
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
