import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Order} from './order.model';
import {OrderSearch} from '../order/order-search.model';
import {Provider} from '../providers/provider.model';
import {OrderArticle} from './order-article.model';

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

  read(id: string): Observable<Order> {
    return this.httpService.get(ApiEndpoint.ORDERS + '\\' + id);
  }

  create(order: Order): Observable<Order> {
    return this.httpService.post(ApiEndpoint.ORDERS, order);
  }

  update(order: Order): Observable<Order> {
    return this.httpService.put(ApiEndpoint.ORDERS + '\\' + order.descriptionOrders, order);
  }

  readAllActives(): Observable<Provider[]> {
    return this.httpService.get(ApiEndpoint.PROVIDERS + ApiEndpoint.ACTIVES);
  }

  readArticlesByProvider(id: string): Observable<OrderArticle[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.PROVIDER, id);
  }

  closeOrder(order: Order[]): Observable<Order[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.CLOSE, order);
  }
}
