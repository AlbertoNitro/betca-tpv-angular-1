import {Component} from '@angular/core';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent {
  static URL = 'invoice_update';

  constructor() {
  }
  searchMobile() {
    console.log('search mobile');
  }
  resetMobile() {
    console.log('reset mobile');
  }
}
