import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ShoppingCartService} from '../cashier-opened/shopping-cart/shopping-cart.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Budget} from './budgets.model';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';

@Injectable()
export class BudgetService {

  constructor(private httpService: HttpService, private shoppingCartService: ShoppingCartService) {
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(ApiEndpoint.BUDGETS + '/' + id);
  }

  fillShoppingCart(shoppingCart: Shopping[]): void {
    return this.shoppingCartService.fill(shoppingCart);
  }

  generatePdf(id: string): Observable<any> {
    return this.httpService.pdf().get(ApiEndpoint.BUDGETS + '/pdf/' + id);
  }

  readAll(): Observable<Budget[]> {
    return this.httpService.get(ApiEndpoint.BUDGETS);
  }

  readById(id: string): Observable<Budget> {
    return this.httpService.get(ApiEndpoint.BUDGETS + '/' + id);
  }
}
