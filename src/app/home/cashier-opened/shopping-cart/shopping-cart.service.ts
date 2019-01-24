import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Shopping} from './shopping.model';
import {TicketCreation} from './ticket-creation.model';
import {Article} from '../../shared/article.model';
import {ArticleService} from '../../shared/article.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {HttpService} from '../../../core/http.service';
import {ArticleQuickCreation} from './article-quick-creation.model';

@Injectable()
export class ShoppingCartService {

  static SHOPPING_CART_NUM = 4;

  private _total = 0;

  private shoppingCart: Array<Shopping> = [];
  private _indexShoppingCart = 0;
  private shoppingCartList: Array<Array<Shopping>> = [];

  private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // subscripcion implica refresh auto

  private _lastArticle: Article;

  constructor(private articleService: ArticleService, private httpService: HttpService) {
    for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
      this.shoppingCartList.push([]);
    }
  }

  shoppingCartObservable(): Observable<Shopping[]> {
    return this.shoppingCartSubject.asObservable();
  }

  get indexShoppingCart(): number {
    if (this._indexShoppingCart === 0) {
      return undefined;
    } else {
      return this._indexShoppingCart + 1;
    }
  }

  get total() {
    return this._total;
  }

  get lastArticle(): Article {
    return this._lastArticle;
  }

  synchronizeCartTotal(): void {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      total = total + shopping.total;
    }
    this._total = Math.round(total * 100) / 100;
  }

  getTotalCommited(): number {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      if (shopping.committed) {
        total += shopping.total;
      }
    }
    return Math.round(total * 100) / 100;
  }

  getReturned(): number {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      if (shopping.total < 0) {
        total += shopping.total;
      }
    }
    return Math.round(-total * 100) / 100;
  }

  uncommitArticlesExist(): boolean {
    for (const shopping of this.shoppingCart) {
      if (!shopping.committed && shopping.amount > 0) {
        return true;
      }
    }
    return false;
  }

  private synchronizeAll() {
    this.shoppingCartSubject.next(this.shoppingCart);
    this.synchronizeCartTotal();
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingCart.indexOf(shopping);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    this.synchronizeAll();
  }

  add(code: string): Observable<Article> {
    const price: number = Number(code.replace(',', '.'));
    if (!Number.isNaN(price) && code.length <= 5) {
      code = '1';
    }
    return this.articleService.readOne(code).pipe(
      map(
        (article: Article) => {
          const shopping = new Shopping(article.code, article.description, article.retailPrice);
          if (article.stock < 1) {
            shopping.committed = false;
          }
          if (article.code === '1') {
            shopping.total = price;
            shopping.updateDiscount();
          }
          this.shoppingCart.push(shopping);
          this._lastArticle = article;
          this.synchronizeAll();
          return article;
        })
    );
  }

  exchange(): void {
    this.shoppingCartList[this._indexShoppingCart++] = this.shoppingCart;
    this._indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
    this.shoppingCart = this.shoppingCartList[this._indexShoppingCart];
    this.synchronizeAll();
  }

  createArticle(articleQuickCreation: ArticleQuickCreation): Observable<Article> {
    return this.httpService.successful().post(ApiEndpoint.ARTICLES, articleQuickCreation);
  }

  checkOut(ticketCreation: TicketCreation): Observable<any> {
    ticketCreation.shoppingCart = this.shoppingCart;
    return this.httpService.pdf().post(ApiEndpoint.TICKETS, ticketCreation).pipe(
      map(() => this.reset())
    );
  }

  private reset() {
    this.shoppingCart = [];
    this.synchronizeAll();
  }

  isEmpty(): boolean {
    return (!this.shoppingCart || this.shoppingCart.length === 0);
  }

}
