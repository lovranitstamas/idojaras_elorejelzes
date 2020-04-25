export class UserModel {
  private _username: string;
  private _city: Array<any>;

  // name
  get usernameFunction(): string {
    return this._username;
  }

  set usernameFunction(name: string) {
    this._username = name;
  }

  // city
  get cityFunction(): Array<any> {
    return this._city;
  }

  set cityFunction(city: Array<any>) {
    this._city = city;
  }

}
