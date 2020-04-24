import {Component, OnInit} from '@angular/core';
import {UserModel} from '../shared/user-model';
import {Observable} from 'rxjs';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss']
})
export class WheatherComponent implements OnInit {
  user$: Observable<UserModel>;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this._userService.getCurrentUser();
  }

}
