import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from 'store';
import { User } from 'app/core/interfaces/user.interface';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select<User>('user');
  }
}
