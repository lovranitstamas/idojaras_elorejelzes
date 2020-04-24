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
  dbReq = indexedDB.open('weatherDB', 1);

  // http://bulk.openweathermap.org/sample/
  // private _jsonURL = './assets/data/weather_teszt.json';

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
    // this.search();
    this.createIndexedDB();
    this.addIndexedDB();
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
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/onerror
    this.dbReq.onupgradeneeded = (event) => {
      // Set the db variable to our database so we can use it!
      const db = (event.target as IDBOpenDBRequest).result;

      // Create an object store named notes. Object stores
      // in databases are where data are stored.
      const objectStore = db.createObjectStore('customers', {keyPath: 'ssn'});

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex('name', 'name', {unique: false});

      // Create an index to search customers by email. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex('email', 'email', {unique: true});

      const customerData = [
        {ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com'},
        {ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org'}
      ];

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = () => {
        // Store values in the newly created objectStore.
        const customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers');
        customerData.forEach((customer) => {
          customerObjectStore.add(customer);
        });
        console.log(db);
      };
    };

  }

  addIndexedDB() {
    this.dbReq.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const customerData = [
        {ssn: '5545-55-5555', name: 'Donnda', age: 32, email: 'tamas76@home.org'}
      ];

      // open a read/write db transaction, ready for adding the data
      const transaction = db.transaction(['customers'], 'readwrite');

      // create an object store on the transaction
      const objectStore = transaction.objectStore('customers');
      // add our newItem object to the object store
      const objectStoreRequest = objectStore.add(customerData[0]);

      objectStoreRequest.onsuccess = () => {
        // report the success of the request (this does not mean the item
        // has been stored successfully in the DB - for that you need transaction.onsuccess)
        console.log(db);
      };
    };
  }

}
