import {ApiEndpoint} from '../../../shared/api-endpoint.model';
import {CashMovement} from './cash-movement.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class CashMovementService {

  constructor(private httpService: HttpService) {
  }

  deposit(cashMovement: CashMovement): Observable<any> {
    return this.httpService.post(ApiEndpoint.DEPOSIT, cashMovement);
  }

  withdrawal(cashMovement: CashMovement): Observable<any> {
    return this.httpService.post(ApiEndpoint.WITHDRAWAL, cashMovement);
  }
}
