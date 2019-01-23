import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {CashierLast} from './cashier-last.model';
import {HttpService} from '../../core/http.service';
import {CashierClosing} from './cashier-closing.model';
import {CashierClosure} from './cashier-closure.model';

@Injectable()
export class CashierService {
  static END_POINT = '/cashier-closures';
  static LAST = '/last';
  static TOTALS = '/totals';

  constructor(private httpService: HttpService) {
  }

  readLast(): Observable<CashierLast> {
    return this.httpService.get(CashierService.END_POINT + CashierService.LAST);
  }

  open(): Observable<any> {
    return this.httpService.post(CashierService.END_POINT);
  }

  readLastTotals(): Observable<CashierClosing> {
    return this.httpService.get(
      CashierService.END_POINT + CashierService.LAST + CashierService.TOTALS);
  }

  close(cashierClosure: CashierClosure): Observable<any> {
    return this.httpService.patch(CashierService.END_POINT + CashierService.LAST, cashierClosure);
  }
}
