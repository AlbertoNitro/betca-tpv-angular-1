import {Component} from '@angular/core';

import {CashierLast} from '../shared/cashier-last.model';

@Component({
  templateUrl: 'cashier-closed.component.html'
})
export class CashierClosedComponent {
  static URL = 'cashier-closed';

  cashierLast: CashierLast = {closed: undefined};

  constructor() {
  }

}
