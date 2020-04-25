import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

// key that is used to access the data in local storageconst
const STORAGE_KEY = 'userlist';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private _storage: StorageService) {
  }

  public storeOnLocalStorage(user): void {

    // get array of users from local storage
    const currentUserList = this._storage.get(STORAGE_KEY) || [];
    // push new user to array
    currentUserList.push(user);

    // insert updated array to local storage
    this._storage.set(STORAGE_KEY, currentUserList);
  }

  public getOnLocalStorage(){
    // console.log(this._storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    return this._storage.get(STORAGE_KEY);
  }

  public updateLocalStorage(currentUserList){
    this._storage.clear();
    this._storage.set(STORAGE_KEY, currentUserList);
  }
}
