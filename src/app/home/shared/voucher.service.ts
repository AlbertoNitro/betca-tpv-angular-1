import {Injectable} from '@angular/core';
import {Voucher} from '../vouchers/voucher.model';
import {ApiEndpoint} from './api-endpoint.model';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {VoucherMin} from './voucher-min.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Voucher[]> {
    return this.httpService.get(ApiEndpoint.VOUCHERS);
  }
  create(voucherMin: VoucherMin): Observable<VoucherMin> {
    return this.httpService.successful('The Voucher  was created').post(ApiEndpoint.VOUCHERS, voucherMin);
  }

  search(consumed: boolean, dateFrom: string, dateTo: string): Observable<Voucher[]> {
    return this.httpService.get(ApiEndpoint.VOUCHERS + '/search?consumed=' + consumed + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
  }

}
