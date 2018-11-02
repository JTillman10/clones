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
    if (this.isRegistering) {
      this.addUsernameControl();
    }
  }

  addUsernameControl() {
    this.form.addControl('username', new FormControl('', Validators.required));
  }

  onSubmit() {
    if (this.formValid) {
      this.submitted.emit(this.newUser);
    }
  }

  get newUser() {
    const newUser: any = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    if (this.isRegistering) {
      newUser.username = this.form.get('username').value;
    }

    return newUser;
  }

  get isRegistering() {
    return this.type === 'registering';
  }

  get formValid() {
    return this.form.valid;
  }

  get emailFormatInvalid() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  fieldRequired(field) {
    const control = this.form.get(field);
    return control.hasError('required') && control.touched;
  }

  fieldValid(field) {
    return this.form.get(field).valid;
  }

  fieldInvalid(field) {
    const control = this.form.get(field);
    return !control.valid && control.touched;
  }
}
