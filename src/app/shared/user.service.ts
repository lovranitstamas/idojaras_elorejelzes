import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  private _user = new ReplaySubject<UserModel>(1);

  constructor(private _router: Router,
              @Inject('API_URL') private apiUrl: string
  ) {
    this.isLoggedIn$.next(false);
  }

  login() {
    // etc. API backend
  }

  setUserToActive(remoteUser) {
    this._user.next(remoteUser);
    this.isLoggedIn$.next(true);
  }

  setUserToInactive() {
    this._user.next(null);
    this.isLoggedIn$.next(false);
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  logout() {
    this.setUserToInactive();
    this._router.navigate(['/home']);
  }
}
