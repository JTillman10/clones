import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User } from 'app/core/interfaces/user.interface';
import { AuthService } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // subscription$: Subscription;
  // user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  get username() {
    return localStorage.getItem('username');
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
