import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Order} from './order.model';
import {OrderSearch} from '../order/order-search.model';
import {OrderArticle} from './order-article.model';
import {Provider} from '../providers/provider.model';
import {Article} from '../shared/article.model';
import {map} from 'rxjs/operators';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';
import {ArticleService} from '../shared/article.service';

@Injectable()
export class OrderService {
  static ARTICLE_VARIOUS = '1';

  private shoppingCart: Array<Article> = [];
  private lastArticle: Article;
  private shoppingCartSubject: Subject<Article[]> = new BehaviorSubject(undefined); // refresh auto


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

  readOne(code: String): Observable<Article> {
    return this.httpService.get(ApiEndpoint.ARTICLES + '/' + code);
  }

  create(articles: Article, provider: Provider): Observable<any> {
    return this.httpService.post(ApiEndpoint.ORDERS + '\\' + articles, provider);
  }

  update(order: Order): Observable<Order> {
    return this.httpService.put(ApiEndpoint.ORDERS + '\\' + order.id, order);
  }

  closeOrder(order: Order[]): Observable<Order[]> {
    return this.httpService.post(ApiEndpoint.ORDERS + ApiEndpoint.CLOSE, order);
  }

  shoppingCartObservable(): Observable<Article[]> {
    return this.shoppingCartSubject.asObservable();
  }

  addArticleOrderList(code: string) {
    return this.articleService.readOne(code).pipe(
      map(
        (article: Article) => {
          const shopping = new Shopping(article.code, article.description, article.retailPrice);
          if (article.stock < 1) {
            shopping.committed = false;
          }
          this.shoppingCart.push(shopping);
          console.log('my list', this.shoppingCart);
          this.lastArticle = article;
          this.shoppingCartSubject.next(this.shoppingCart);
        }));
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingCart.indexOf(shopping);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    this.shoppingCartSubject.next(this.shoppingCart);
  }
}
