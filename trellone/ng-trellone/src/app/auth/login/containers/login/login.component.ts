import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserToAuthenticate } from 'app/auth/shared/interfaces/user-to-authenticate';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: UserToAuthenticate) {
    await this.authService
      .loginUser(event.email, event.password)
      .subscribe(
        res => this.router.navigate(['/']),
        err => (this.error = err.error.message)
      );
  }
}
