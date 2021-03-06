import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  private _user = new ReplaySubject<UserModel>(1);
  user: UserModel;

  constructor(private _router: Router,
              @Inject('API_URL') private _baseUrl: string,
              private _localStorageService: LocalStorageService,
              private _httpClient: HttpClient,
  ) {
    this.isLoggedIn$.next(false);
  }

  saveUserInLocalStorage(theUser) {
    this._localStorageService.storeOnLocalStorage(theUser);
    return true;
  }

  loginFromBackend(form): Observable<any> {
    // API backend
    return this._httpClient.post<any>(`${this._baseUrl}/login`, {data: form})
      .pipe(map((user) => {
          return user;
        }),
        catchError(this.handleError));
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
    this._router.navigate(['/user/login']);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
