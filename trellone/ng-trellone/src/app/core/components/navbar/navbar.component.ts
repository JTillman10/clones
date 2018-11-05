import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get username() {
    return localStorage.getItem('username');
  }

  get loggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
