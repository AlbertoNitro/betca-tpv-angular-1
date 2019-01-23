import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {CashierLast} from './cashier-last.model';

@Injectable()
export class CashierService {
  static END_POINT = '/cashier-closures';
  static LAST = '/last';

  constructor(private httpService: HttpService) {
  }

  readLast(): Observable<CashierLast> {
    return this.httpService.get(CashierService.END_POINT + CashierService.LAST);
  }

  open(): Observable<any> {
    return this.httpService.post(CashierService.END_POINT);
  }

}
