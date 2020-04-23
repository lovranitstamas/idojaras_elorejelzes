import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherMapService} from '../shared/weather-map.service';


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
              private _route: ActivatedRoute) {
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
      });
  }

  renderResults(res: any): void {
    this.results = null;
    console.log(res);
    /*if (res && res.city) {
      this.results = res.city;
    }*/
  }

  submit(queryParam: string): void {
    this._router.navigate(['weather'], {queryParams: {query: queryParam}}).then(() => this.search());
  }

}
