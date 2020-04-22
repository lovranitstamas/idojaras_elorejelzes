import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userService.isLoggedIn$.pipe(
      map(
        isLoggedIn => {
          if (isLoggedIn === false) {
            this._router.navigate(['/user/login']);
            return false;
          } else {
            return true;
          }
        }
      )
    );
  }
}
