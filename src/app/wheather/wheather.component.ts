import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../shared/user-model';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../shared/user.service';
import {ModalComponent} from '../core/modal/modal.component';
import {LocalStorageService} from '../shared/local-storage.service';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss'],
  providers: [NgbTabsetConfig]
})
export class WheatherComponent implements OnInit, OnDestroy {
  updateProcessing: boolean;
  user$: Observable<UserModel>;
  objects: any = [];

  @ViewChild('myModal') modal: ModalComponent;
  @ViewChild('myTabs') ngbTabSet: NgbTabset;

  private _user: UserModel;
  private _subscription: Subscription;

  constructor(private _userService: UserService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {

    this.updateProcessing = false;
    this.user$ = this._userService.getCurrentUser();

    this._subscription = this._userService.getCurrentUser().subscribe(user => {
      this._user = user;
    });
    this.refreshTab();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  formatXAxisValue(value: number) {
    return value === 1 ? `Holnap` : `${value} .nap`;
  }

  onTabChange($event) {
  }

  onTabClick() {
    if (this.ngbTabSet.activeId === 'modal') {
      this.modal.open();
    }
  }

  updateTabContent(id) {
    this.updateProcessing = true;
    this.refreshTab();
    setTimeout(() => {
      this.ngbTabSet.select('ngb-tab-' + id);
      this.updateProcessing = false;
    }, 1500);
  }

  refreshTab() {
    this.objects = this._user.cityFunction;
  }

  deleteCity(id: number) {

    // remove the delete city from model
    this._user.cityFunction = this._user.cityFunction.filter((item) => {
      return item.city.id !== +id;
    });

    // find the user in storage
    // TODO at API backend call
    const theUser = this._localStorageService.getOnLocalStorage().find(user => {
      return user.username === this._user.usernameFunction;
    });

    // store the modified user in a variable
    const modifiedUser = {
      username: this._user.usernameFunction,
      password: theUser.password,
      city: this._user.cityFunction
    };

    // push the other users in an array (from storage) with the modified user
    let otherUsers;
    otherUsers = this._localStorageService.getOnLocalStorage().filter(user => user.username !== this._user.usernameFunction);
    otherUsers.push(modifiedUser);

    // update storage
    this._localStorageService.updateLocalStorage(otherUsers);

    // console.log('Instance: ', this._user);
    // console.log('Localstorage: ', this._localStorageService.getOnLocalStorage());
    this.refreshTab();

  }

}
