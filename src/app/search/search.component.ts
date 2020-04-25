import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherMapService} from '../shared/weather-map.service';
import {HttpClient} from '@angular/common/http';
import {IndexedDBService} from '../shared/indexed-db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  results: any;
  warningMessage = '';
  @Output() enableSave: EventEmitter<boolean> = new EventEmitter();
  @Output() tempCityId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _weather: WeatherMapService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient,
              private _indexedDBService: IndexedDBService) {
    this._route
      .queryParams
      .subscribe(params => {
        this.query = params.query || '';
      });
  }

  ngOnInit(): void {
    // API Backend Call
    // this.search();
  }

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
      this.tempCityId.emit(res as number);
    }).catch(err => {
      this.warningMessage = 'Nincs találat';
      console.warn(err);
    });
  }

  renderResults(res: any): void {
    this.results = null;
    console.log(res);
    if (res && res.name) {
      // this.results = res.city;
    }
  }

  submit(queryParam: string): void {
    this.warningMessage = '';
    this.enableSave.emit(false);

    if (queryParam.trim().length) {
      this.searchFromLocalDisk(queryParam.trim());
    } else {
      this.warningMessage = 'Min 1. karakter';
    }

    // API Backend Call
    // this._router.navigate(['weather'], {queryParams: {query: queryParam}}).then(() => this.search());
  }
}
