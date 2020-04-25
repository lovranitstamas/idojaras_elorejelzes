import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../shared/user-model';
import {Observable} from 'rxjs';
import {UserService} from '../shared/user.service';
import {ModalComponent} from '../core/modal/modal.component';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss']
})
export class WheatherComponent implements OnInit {
  user$: Observable<UserModel>;
  countries: any = [];
  @ViewChild('myModal') modal: ModalComponent;
  private _user: UserModel;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {

    this.user$ = this._userService.getCurrentUser();

    this._userService.getCurrentUser().subscribe(user => {
      this._user = user;
      this.refreshTab();
    });

  }

  onTabChange($event) {
    if ($event.nextId === 'modal') {
      this.modal.open();
    }
  }

  updateTabContent() {
    this.refreshTab();
  }

  refreshTab() {
    this.countries = this._user.cityFunction;
  }
}
