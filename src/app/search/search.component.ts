import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherMapService} from '../shared/weather-map.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  results: any;

  constructor(private _weather: WeatherMapService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient) {
    this._route
      .queryParams
      .subscribe(params => {
        this.query = params.query || '';
      });
  }

  ngOnInit(): void {
    this.search();
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

  renderResults(res: any): void {
    this.results = null;
    console.log(res);
    if (res && res.name) {
      // this.results = res.city;
    }
  }

  submit(queryParam: string): void {
    this._router.navigate(['weather'], {queryParams: {query: queryParam}}).then(() => this.search());
  }
}
