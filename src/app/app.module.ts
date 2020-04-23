import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {HomeComponent} from './home/home.component';
import {WheatherComponent} from './wheather/wheather.component';
import {LoginComponent} from './user/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';
import {SearchComponent} from './search/search.component';

import {LoggedInGuard} from './shared/logged-in.guard';
import {UserService} from './shared/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from './shared/local-storage.service';
import {WeatherMapService} from './shared/weather-map.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WheatherComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    ...AppRoutingModule.routableComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    StorageServiceModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    LoggedInGuard,
    LocalStorageService,
    WeatherMapService,
    // {provide: 'API_URL', useValue: 'http://localhost:1234/'}
    {provide: 'API_URL', useValue: './'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
