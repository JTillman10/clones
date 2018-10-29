import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  async loginUser(event) {
    await this.authService.loginUser(event.email, event.password).subscribe();
  }
}
