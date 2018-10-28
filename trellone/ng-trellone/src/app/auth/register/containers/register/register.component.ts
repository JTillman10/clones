import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { NewUser } from 'src/app/auth/shared/interfaces/new-user.interface';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  async registerUser(event: NewUser) {
    console.log(event);
    // await this.authService.createUser(newUser);
  }
}
