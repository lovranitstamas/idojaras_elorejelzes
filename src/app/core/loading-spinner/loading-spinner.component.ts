import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() loaderWidth = 120;
  @Input() loaderHeight = 120;
  @Input() extraInformation = 'Új regisztrációkor az adatbázis előkészítése kis időt vesz igénybe';

}
