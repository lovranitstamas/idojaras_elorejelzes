export class UserModel {
  private _username: string;
  private _city: Array<number>;

  // name
  get usernameFunction(): string {
    return this._username;
  }

  set usernameFunction(name: string) {
    this._username = name;
  }

  // city
  get cityFunction(): Array<number> {
    return this._city;
  }

  set cityFunction(city: Array<number>) {
    this._city = city;
  }

}
