import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {CashierLast} from './cashier-last.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class CashierService {
  static END_POINT = '/cashier-closures';
  static LAST = '/last';

  constructor(private httpService: HttpService) {
  }

  last(): Observable<CashierLast> {
    return this.httpService.bearerAuth().get(CashierService.END_POINT + CashierService.LAST);
  }

}
