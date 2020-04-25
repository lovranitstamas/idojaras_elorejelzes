import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../shared/user-model';
import {IndexedDBService} from '../../shared/indexed-db.service';
import {LocalStorageService} from '../../shared/local-storage.service';

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
  const str = control.value;
  const patt = /^[a-zA-Z]+$/;
  if (!patt.test(str)
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
  passwordWrong = '';

  @HostListener('input')
  oninput() {
    this.onProcess = false;
  }

  constructor(private _userService: UserService,
              private _indexedDBService: IndexedDBService,
              private _localStorageService: LocalStorageService,
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
    this.passwordWrong = '';

    if (form.valid) {
      if (this.makeUserInstance(form, this._localStorageService.getOnLocalStorage())){
        this.startOnProcessDB();
      }
    }
  }

  startOnProcessDB() {
    this.onProcessDB = true;
    this._indexedDBService.createIndexedDB().then((res) => {
      if (res === false) {
        this.onProcessDB = false;
        this._router.navigate(['/weather']);
      }
    });
  }

  makeUserInstance(form, isSetLocalStorage) {
    // TODO backend api if isSetLocalStorage variable false

    // check user
    if (isSetLocalStorage) {
      const theUser = this._localStorageService.getOnLocalStorage().find(user => {
        return user.username === form.value.username.trim();
      });

      if (!theUser) {
        // TODO backend api
        // change obj to API result

        // local storage
        const obj = {
          username: form.value.username.trim(),
          password: form.value.password,
          city: []
        };
        this.createDefaultUser(obj);
        return true;
      } else {
        if (theUser.password === form.value.password.trim()) {
          this._user = new UserModel();

          this._user.usernameFunction = theUser.username;
          this._user.cityFunction = theUser.city;

          this._userService.setUserToActive(this._user);

          // console.log('Instance: ', this._user);
          // console.log('Localstorage: ', this._localStorageService.getOnLocalStorage());

          return true;
        } else {
          this.passwordWrong = 'Jelszó nem megfelelő';

          this.loginForm.reset({
            username: form.value.username,
            password: null,
          });

          return false;
        }
      }
    } else {
      const obj = {
        username: form.value.username.trim(),
        password: form.value.password,
        city: []
      };
      this.createDefaultUser(obj);

      return true;
    }
  }

  createDefaultUser(dLUserO) {
    this._user = new UserModel();

    this._user.usernameFunction = dLUserO.username;
    this._user.cityFunction = [];

    // Save the user in the local storage
    this._userService.saveUserInLocalStorage(dLUserO);

    console.log('Instance: ', this._user);
    console.log('Localstorage: ', this._localStorageService.getOnLocalStorage());
    this._userService.setUserToActive(this._user);
  }

  closeAlert() {
    this.onProcess = false;
  }

}
