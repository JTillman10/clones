import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { User } from 'app/core/interfaces/user.interface';

export interface State {
  user: User;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, value: any) {
    this.subject.next({ ...this.value, [name]: value });
  }
}
