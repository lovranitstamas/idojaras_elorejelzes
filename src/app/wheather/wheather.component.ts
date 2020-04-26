import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../shared/user-model';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../shared/user.service';
import {ModalComponent} from '../core/modal/modal.component';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss']
})
export class WheatherComponent implements OnInit, OnDestroy {
  user$: Observable<UserModel>;
  objects: any = [];
  @ViewChild('myModal') modal: ModalComponent;
  arrayForecast = [];
  private _user: UserModel;
  private _subscription: Subscription;

  constructor(private _userService: UserService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {

    this.user$ = this._userService.getCurrentUser();

    this._subscription = this._userService.getCurrentUser().subscribe(user => {
      this._user = user;
    });
    this.refreshTab();
    this.forecast();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onTabChange($event) {
    if ($event.nextId === 'modal') {
      this.modal.open();
    }
  }

  updateTabContent() {
    this.refreshTab();
    this.forecast();
  }

  refreshTab() {
    this.objects = this._user.cityFunction;
  }

  forecast() {
    this._user.cityFunction.forEach((object) => {
      for (let i = 1; i <= 5; i++) {

        let dayIndicator;
        i === 1 ? dayIndicator = 'Holnap' : dayIndicator = i + '. nap';

        const newObject =
          {
            name: object.city.name,
            series: [
              {
                value: object.data[i].temp.day,
                name: dayIndicator
              }
            ]
          };
        this.arrayForecast.push(newObject);
      }
    });
  }

  deleteCity(id: number) {

    this._user.cityFunction = this._user.cityFunction.filter((item) => {
      return item.city.id !== +id;
    });

    // TODO at API backend call
    const theUser = this._localStorageService.getOnLocalStorage().find(user => {
      return user.username === this._user.usernameFunction;
    });

    const modifiedUser = {
      username: this._user.usernameFunction,
      password: theUser.password,
      city: this._user.cityFunction
    };

    let otherUsers;
    otherUsers = this._localStorageService.getOnLocalStorage().filter(user => user.username !== this._user.usernameFunction);
    otherUsers.push(modifiedUser);
    this._localStorageService.updateLocalStorage(otherUsers);

    // console.log('Instance: ', this._user);
    // console.log('Localstorage: ', this._localStorageService.getOnLocalStorage());
    this.refreshTab();

  }
}
