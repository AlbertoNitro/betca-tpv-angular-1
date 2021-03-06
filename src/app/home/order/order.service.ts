import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Order} from './order.model';
import {OrderSearch} from '../order/order-search.model';

@Injectable()
export class OrderService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Order[]> {
    return this.httpService.get(ApiEndpoint.ORDERS);
  }

  readSearch(order: OrderSearch): Observable<Order[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.SEARCH, order);
  }

  closeOrder(order: Order[]): Observable<Order[]>{
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.CLOSE, order)
  }
}
