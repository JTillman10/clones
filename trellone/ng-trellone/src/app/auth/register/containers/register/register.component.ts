import { Component } from '@angular/core';
import { AuthService } from '../../..//shared/services/auth/auth.service';
import { NewUser } from '../../..//shared/interfaces/new-user.interface';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  async registerUser(event: NewUser) {
    await this.authService.createUser(event).subscribe();
  }
}
