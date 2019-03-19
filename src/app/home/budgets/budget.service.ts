import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Budget} from './budgets.model';

@Injectable()
export class BudgetService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Budget[]> {
    return this.httpService.get(ApiEndpoint.BUDGETS);
  }

}
