import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalComponent} from './modal/modal.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ModalComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot()
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ModalComponent,
    LoadingSpinnerComponent
  ]
})
export class CoreModule {
}
