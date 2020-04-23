import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {WheatherComponent} from './wheather/wheather.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

import {ProfileComponent} from './user/profile/profile.component';
import {LoginComponent} from './user/login/login.component';
import {LoggedInGuard} from './shared/logged-in.guard';

const routes: Routes = [
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  // {path: 'home', component: HomeComponent },
  {path: 'weather',  component: WheatherComponent, /*canActivate: [LoggedInGuard]*/},
  {
    path: 'user',
    children: [
      // {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routableComponents = [
    // HomeComponent,
    WheatherComponent,
    LoginComponent,
    // ProfileComponent,
    PageNotFoundComponent
  ];
}
