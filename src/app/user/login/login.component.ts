import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../shared/user-model';

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
  loginForm: FormGroup;
  password: any;
  private _user: UserModel;

  @HostListener('input')
  oninput() {
    this.onProcess = false;
  }

  constructor(private _userService: UserService,
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
      if (this._userService.loginFromLocaleStorage(form)) {
        this.makeUserInstance(form);
        this._router.navigate(['/wheather']);
      } else {
        // API

        // subscribe next function
        // Save the user in the local storage
        this._userService.saveUserInLocalStorage(form);

        this.makeUserInstance(form);
        this._router.navigate(['/wheather']);
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
