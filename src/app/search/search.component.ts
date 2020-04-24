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

  private _jsonURL = './assets/data/city.list.json';

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
    // this.search();
    this.createIndexedDB();
    // this.addIndexedDB();
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

  createIndexedDB() {

    // let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    this._http.get(this._jsonURL).subscribe((data) => {

      console.log(Object.values(data));
      const dbReq = indexedDB.open('weatherDB', 1);

      dbReq.onupgradeneeded = (event) => {
        // Set the db variable to our database so we can use it!
        const db = (event.target as IDBOpenDBRequest).result;

        // Create an object store named notes. Object stores
        // in databases are where data are stored.
        const objectStore = db.createObjectStore('cities', {keyPath: 'id'});

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.
        objectStore.transaction.oncomplete = () => {
          // Store values in the newly created objectStore.
          const customerObjectStore = db.transaction('cities', 'readwrite').objectStore('cities');
          Object.values(data).forEach((city) => {
            customerObjectStore.add(city);
          });
          console.log(db);
        };
      };
    });
  }

  addIndexedDB() {
    const dbReq = indexedDB.open('weatherDB', 1);
    dbReq.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const cityData = [
        {sn: '5545-55-5555', name: 'Donnda', age: 32, email: 'tamas76@home.org'}
      ];

      // open a read/write db transaction, ready for adding the data
      const transaction = db.transaction(['cities'], 'readwrite');

      // create an object store on the transaction
      const objectStore = transaction.objectStore('cities');
      // add our newItem object to the object store
      const objectStoreRequest = objectStore.add(cityData[0]);

      objectStoreRequest.onsuccess = () => {
        // report the success of the request (this does not mean the item
        // has been stored successfully in the DB - for that you need transaction.onsuccess)
        console.log(db);
      };
    };
  }

}
