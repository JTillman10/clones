import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../..//shared/services/auth/auth.service';
import { NewUser } from '../../..//shared/interfaces/new-user.interface';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async registerUser(event: NewUser) {
    await this.authService
      .createUser(event)
      .subscribe(
        res => this.router.navigate(['/']),
        err => (this.error = err.error.message)
      );
  }
}
