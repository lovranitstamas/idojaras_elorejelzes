import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherMapService} from '../shared/weather-map.service';
import {HttpClient} from '@angular/common/http';
import {IndexedDBService} from '../shared/indexed-db.service';
import {UserService} from '../shared/user.service';
import {UserModel} from '../shared/user-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  results: any;
  warningMessage = '';
  detectCity = false;
  countryListDB: any;
  @Output() enableSave: EventEmitter<boolean> = new EventEmitter();
  @Output() tempCity: EventEmitter<any> = new EventEmitter();
  private _user: UserModel;

  @HostListener('input')
  oninput() {
    this.enableSave.emit(false);
    this.detectCity = false;
  }

  constructor(private _weather: WeatherMapService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient,
              private _indexedDBService: IndexedDBService,
              private _userService: UserService) {
    this._route
      .queryParams
      .subscribe(params => {
        this.query = params.query || '';
      });
  }

  ngOnInit(): void {
    this._userService.getCurrentUser().subscribe(user => {
      this._user = user;
    });

    this._indexedDBService.findAllDB(this._user.cityFunction).then(res => {
      Object.keys(res).length ? this.countryListDB = res : this.countryListDB = null;
    });

    // TODO test call in backend case
    // this.search();
  }

  // TODO test call in backend case
  search(): void {
    if (!this.query) {
      return;
    }

    this._weather
      .searchCountry(this.query)
      .subscribe((res: any) => {
        this.renderResults(res);
      }, () => {
        console.log('Ilyen nevű város nem található az adatbázisban');
      });
  }

  searchFromLocalDisk(queryParam: string) {
    this._indexedDBService.findIndexedDB(queryParam).then(res => {
      this.enableSave.emit(true);
      this.tempCity.emit(res);
      this.detectCity = true;
    }).catch(err => {
      this.warningMessage = 'Nincs találat';
      console.warn(err);
    });
  }

  // TODO test call in backend case
  renderResults(res: any): void {
    this.results = null;
    console.log(res);
    if (res && res.name) {
    }
  }

  submit(queryParam: string): void {
    this.warningMessage = '';
    this.detectCity = false;
    this.enableSave.emit(false);

    if (queryParam.trim().length) {
      this.searchFromLocalDisk(queryParam.trim());
    } else {
      // this.warningMessage = 'Min 1. karakter';
      this.warningMessage = 'Kérem válasszon!';
    }

    // TODO test call in backend case
    // this._router.navigate(['weather'], {queryParams: {query: queryParam}}).then(() => this.search());
  }
}
