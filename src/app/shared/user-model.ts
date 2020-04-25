export class UserModel {
  private _username: string;
  private _city: any;

  // name
  get usernameFunction(): string {
    return this._username;
  }

  set usernameFunction(name: string) {
    this._username = name;
  }

  // city
  get cityFunction(): any {
    return this._city;
  }

  set cityFunction(city: any) {
    this._city = city;
  }

}
