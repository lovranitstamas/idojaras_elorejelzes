import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {

  private _routerSub = Subscription.EMPTY;
  private _routerSubEnd = Subscription.EMPTY;

  isCollapsed = true;
  isLoggedIn = false;

  // tslint:disable-next-line:variable-name
  constructor(public userService: UserService, private _router: Router) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnInit() {
    this._routerSub = this._router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.isCollapsed = true;
      });

    this._routerSubEnd = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy() {
    this._routerSub.unsubscribe();
    this._routerSubEnd.unsubscribe();
  }

  clickOnRouterLink() {
    this.isCollapsed = true;
    window.scrollTo(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const target = event.target;
    if (target.innerWidth > 576) {
      this.isCollapsed = true;
    }
  }

  logout() {
    this.userService.logout();
  }

}
