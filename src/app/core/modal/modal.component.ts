import {Component, OnInit, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../shared/user.service';
import {UserModel} from '../../shared/user-model';
import {LocalStorageService} from '../../shared/local-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('content') content: any;
  private _user: UserModel;
  closeResult = '';
  enable = false;
  private _tempCityId: number;


  constructor(private modalService: NgbModal,
              private _userService: UserService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this._userService.getCurrentUser().subscribe(user => {
      this._user = user;
    });
  }

  open() {
    /*this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
    // and use the reference from the component itself
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      // if the user has not got the selected country
      const arrayCity: number[] = this._user.cityFunction;

      if (arrayCity) {
        const found = arrayCity.find(element => element === this._tempCityId);
        if (!found) {
          arrayCity.push(this._tempCityId);
          this._user.cityFunction = arrayCity;
        }
      } else {
        arrayCity.push(this._tempCityId);
        this._user.cityFunction = arrayCity;
      }

      // create m. user object with password
      // TODO except API backend call
      const theUser = this._localStorageService.getOnLocalStorage().find(user => {
        return user.username === this._user.usernameFunction;
      });
      const modifiedUser = {
        username: this._user.usernameFunction,
        password: theUser.password,
        city: arrayCity
      };

      // merge the user arrays
      const allUsers = [];
      this._localStorageService.getOnLocalStorage().map(user => {
        if (user.username !== this._user.usernameFunction) {
          allUsers.push(user);
        }
      });
      allUsers.push(modifiedUser);

      // update local storage
      this._localStorageService.updateLocalStorage(allUsers);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setTempCityId(event) {
    this._tempCityId = event;
    console.log('CityId: ' + event);
  }

  enableSaveCity(event) {
    console.log('Enable save: ' + event);
    event ? this.enable = true : this.enable = false;
  }
}
