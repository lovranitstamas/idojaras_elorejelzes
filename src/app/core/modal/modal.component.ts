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
  user: UserModel;
  closeResult = '';
  enable = false;
  private _tempCityId: number;


  constructor(private modalService: NgbModal,
              private _userService: UserService,
              private _localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this._userService.getCurrentUser().subscribe(user => {
      this.user = user;
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

      // assign the country to user (in the case of new country)
      const theUser = this._localStorageService.getOnLocalStorage().find(user => {
        return user.username === this.user.usernameFunction;
      });

      // if the user has not selected country
      if (!theUser.city) {
        const city = {city: []};
        const theNewUser = Object.assign(theUser, city);
        theNewUser.city.push(this._tempCityId);
        console.log(theNewUser);
        // this._localStorageService.storeCountryId(theNewUser);
      }

      // get the other users
      const otherUsers = [];
      this._localStorageService.getOnLocalStorage().map(user => {
        if (user.username !== this.user.usernameFunction) {
          otherUsers.push(user);
        }
      });
      otherUsers.push(theUser);

      // update local storage
      this._localStorageService.updateLocalStorage(otherUsers);

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
