import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Order, orderClose} from './order.model';
import {OrderSearch} from '../order/order-search.model';
import {OrderArticle} from './order-article.model';
import {Article} from '../shared/article.model';
import {map} from 'rxjs/operators';
import {ArticleService} from '../shared/article.service';

@Injectable()
export class OrderService {
  static ARTICLE_VARIOUS = '1';

  private shoppingCart: Array<OrderArticle> = [];
  private lastArticle: Article;
  private orderArticlesObservable: Subject<OrderArticle[]> = new BehaviorSubject(undefined); // refresh auto

  constructor(private httpService: HttpService, private articleService: ArticleService) {
  }

  static isArticleVarious(code: string): boolean {
    return code === OrderService.ARTICLE_VARIOUS;
  }

  readAll(): Observable<Order[]> {
    console.log('readAll: ' + this.httpService.get(ApiEndpoint.ORDERS));
    return this.httpService.get(ApiEndpoint.ORDERS);
  }

  readSearch(order: OrderSearch): Observable<Order[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.SEARCH, order);
  }

  read(id: string): Observable<Order> {
    return this.httpService.get(ApiEndpoint.ORDERS + '\\' + id);
  }

  readOne(code: String): Observable<OrderArticle> {
    return this.httpService.get(ApiEndpoint.ARTICLES + '/' + code);
  }

  create(or): Observable<OrderArticle[]> {
    return this.httpService.post(ApiEndpoint.ORDERS, or);
  }

  finById(order: Order): Observable<OrderArticle[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.ARTICLE, order);
  }

  update(order: Order): Observable<Order> {
    return this.httpService.put(ApiEndpoint.ORDERS + '\\' + order.id, order);
  }

  closeOrder(order: orderClose): Observable<Order> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.CLOSE, order);
  }

  shoppingCartObservable(): Observable<OrderArticle[]> {
    return this.orderArticlesObservable.asObservable();
  }

  getArticleOrderList(orderArticle: OrderArticle[] ) {
    return orderArticle.forEach( (value) => {
      const shopping = new OrderArticle(value.code, value.description, value.retailPrice, value.provider);
      this.shoppingCart.push(shopping);
      this.orderArticlesObservable.next(this.shoppingCart);
    });
  }

  addArticleOrderList(code: string, idProvider: string) {
    return this.articleService.readOne(code).pipe(
      map(
        (article: Article) => {
          this.shoppingCart.forEach( (value) => {
            if (value.provider !== idProvider ) {
               alert('No se puede agregar artículos de otro proveedor');
               this.shoppingCart = [];
               return this.orderArticlesObservable.next(this.shoppingCart);
            }
          });
          const shopping = new OrderArticle(article.code, article.description, article.retailPrice, idProvider);
          if (article.stock < 1) {
            shopping.committed = false;
          }
          this.shoppingCart.push(shopping);
          this.lastArticle = article;
          this.orderArticlesObservable.next(this.shoppingCart);
        }));
  }

  resetOrderArticlesObsrvList() {
    this.shoppingCart = [];
    this.orderArticlesObservable.next(this.shoppingCart);
  }

  deleteOrder(orderArticle: OrderArticle): void {
    const index = this.shoppingCart.indexOf(orderArticle);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    this.orderArticlesObservable.next(this.shoppingCart);
  }

  delete(order: Order): Observable<any> {
    return this.httpService.delete(ApiEndpoint.ORDERS + '/' + order.id);
  }
}
