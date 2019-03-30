import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Budget} from './budgets.model';

@Injectable()
export class BudgetService {

  constructor(private httpService: HttpService) {
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(ApiEndpoint.BUDGETS + '/' + id);
  }

  readAll(): Observable<Budget[]> {
    return this.httpService.get(ApiEndpoint.BUDGETS);
  }

  readById(id: string): Observable<Budget> {
    return this.httpService.get(ApiEndpoint.BUDGETS + '/' + id);
  }

}
