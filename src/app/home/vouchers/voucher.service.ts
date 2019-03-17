import {Injectable} from '@angular/core';
import {Voucher} from '../vouchers/voucher.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Voucher[]> {
    return this.httpService.get(ApiEndpoint.VOUCHERS);
  }
}
