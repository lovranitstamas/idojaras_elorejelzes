import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class CoreModule {
}
