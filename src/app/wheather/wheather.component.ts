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
  countries = [1];
  @ViewChild('myModal') modal: ModalComponent;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this._userService.getCurrentUser();
    if (!this.countries.length) {
      // console.log('modal');
      this.modal.open();
    }
  }

  onTabChange($event) {
    if ($event.nextId === 'modal') {
      // console.log('modal');
      this.modal.open();
    }
  }

  updateTabContent() {
    console.log('Update tab');
  }
}
