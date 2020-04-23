import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherMapService {
  static BASE_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private _http: HttpClient) {
  }

  query(URL: string, params?: Array<string>): Observable<any> {
    let queryURL = `${WeatherMapService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join(',')}`;
    }
    const apiKey = environment.weatherApiKey;
    queryURL = `${queryURL}&appid=${apiKey}`;

    return this._http.request('GET', queryURL);
  }

  search(query: string): Observable<any> {
    return this.query(`/weather`, [`q=${query}`]);
  }

  searchCountry(query: string): Observable<any> {
    // api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
    return this.search(query);
  }
}
