import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../shared/user-model';
import {IndexedDBService} from '../../shared/indexed-db.service';

/**
 * Our custom validator
 *
 * A validator:
 * - Takes a `Control` as it's input and
 * - Returns a `StringMap<string, boolean>` where the key is "error code" and
 *   the value is `true` if it fails
 */
function usernameValidator(control: FormControl): { [s: string]: boolean } {
  // tslint:disable-next-line:max-line-length
  if (!control.value.match(/^[a-zA-Z]+$/)
  ) {
    return {invalidUsername: true};
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  onProcess = false;
  onProcessDB = false;
  loginForm: FormGroup;
  password: any;
  private _user: UserModel;

  @HostListener('input')
  oninput() {
    this.onProcess = false;
  }

  constructor(private _userService: UserService,
              private _indexedDBService: IndexedDBService,
              private _router: Router,
              fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.compose([Validators.required, usernameValidator])],
      password: ['', Validators.required]
    });

    this.password = this.loginForm.controls.password;
  }

  ngOnInit(): void {
  }

  login(form) {
    this.onProcess = true;

    if (form.valid) {
      this.onProcessDB = true;
      if (this._userService.loginFromLocaleStorage(form)) {
        this._indexedDBService.createIndexedDB().then((res) => {
          if (res === false) {
            this.makeUserInstance(form);
            this.onProcessDB = false;
            this._router.navigate(['/weather']);
          }
        });
      } else {
        // API

        // subscribe next function
        // Save the user in the local storage
        this._userService.saveUserInLocalStorage(form);

        this._indexedDBService.createIndexedDB().then((res) => {
          if (res === false) {
            this.makeUserInstance(form);
            this.onProcessDB = false;
            this._router.navigate(['/weather']);
          }
        });
        // subscribe error function

      }
    }
  }

  makeUserInstance(form) {
    this._user = new UserModel();

    this._user.usernameFunction = form.value.username;
    this._userService.setUserToActive(this._user);
  }


  closeAlert() {
    this.onProcess = false;
  }

}
