import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalComponent} from './modal/modal.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {SearchComponent} from '../search/search.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule.forRoot(),
        FormsModule
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
