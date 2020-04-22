export class UserModel {
  private _username: string;

  // name
  get usernameFunction(): string {
    return this._username;
  }

  set usernameFunction(name: string) {
    this._username = name;
  }

}
