import {Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog, MatTableDataSource} from '@angular/material';
import {OrderService} from './order.service';
import {OrderArticle} from './order-article.model';
import {ProviderService} from '../providers/provider.service';
import {Provider} from '../providers/provider.model';
import {ArticleService} from '../shared/article.service';
import {Article} from '../shared/article.model';
import {ShoppingCartService} from '../cashier-opened/shopping-cart/shopping-cart.service';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';

@Component({
  templateUrl: 'order-save-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']

})
export class OrderSaveDialogComponent implements OnInit {

  mode: string;
  order: {} = {};
  orderArticle: Article[];
  providers: Provider[];
  title = 'Articles from providers';
  columns = [];
  displayedColumns = ['id', 'description', 'amount', 'price', 'actions'];
  dataTAbleArticles: MatTableDataSource<OrderArticle>;
  idProveedorUpdate: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService, private providerService: ProviderService,
              private  articleService: ArticleService, private  dialog: MatDialog, private shoppingCartService: ShoppingCartService) {
    this.mode = data.mode;
    this.columns = data.columns;
    if (this.mode === 'update') {
      this.orderService.resetOrderArticlesObsrvList();
      this.orderService.getArticleOrderList(data.datos);
      this.orderService.shoppingCartObservable().subscribe(
        result => {
          this.dataTAbleArticles = new MatTableDataSource<OrderArticle>(result);
        },
        () => { },
        () => {
          this.orderService.resetOrderArticlesObsrvList();
        }
      );
    }
    if (this.mode === 'create') {
      this.orderService.shoppingCartObservable().subscribe(
        result => {
          this.dataTAbleArticles = new MatTableDataSource<OrderArticle>(result);
        }
      );
    }
  }

  ngOnInit() {
    this.getProviderActive();
  }

  getProviderActive() {
    if (this.mode === 'update') {
      this.data.datos.forEach((value) => {
        this.idProveedorUpdate = value.provider;
      });
      this.providerService.read(this.idProveedorUpdate).subscribe(
        data => {
          this.providers = [];
          this.providers.push(data);
        }
      );
    }
    if (this.mode === 'create') {
      this.providerService.readAllActives().subscribe(
        data => {
          this.providers = data;
        }
      );
    }
  }

  getArticlesByProvider(id: string) {
    this.articleService.readArticlesByProvider(id).subscribe(
      data => {
        this.orderArticle = data;
      }
    );
    this.getProviderActive();
  }

  create() {
    let or;
    this.orderService.shoppingCartObservable().subscribe(
      result => {
        or = result;
      },
      error => { },
      () => { }
    );
    if (this.mode === 'update') {
      this.orderService.delete(this.data.orderSelect).subscribe(
        result => { },
        () => {
          this.orderService.resetOrderArticlesObsrvList();
        }
      );
    }
    this.orderService.create(or).subscribe(
      result => { },
      (error) => { },
      () => {
        this.orderService.resetOrderArticlesObsrvList();
      }
    );
  }

  addArticleOrderList(code: string, idProvider: string) {
    this.orderService.addArticleOrderList(code, idProvider).subscribe(
      result => { }
    );
  }

  totalShoppingCart(): number {
    return this.shoppingCartService.getTotalShoppingCart();
  }

  indexShoppingCart(): number {
    return this.shoppingCartService.getIndexShoppingCart() === 0 ? undefined : this.shoppingCartService.getIndexShoppingCart();
  }

  priceLabel(shopping: Shopping) {
    if (this.isArticleVarious(shopping.code)) {
      return Math.round(shopping.total / shopping.amount * 100) / 100;
    } else {
      return shopping.retailPrice;
    }
  }

  incrementAmount(shopping: Shopping) {
    shopping.amount++;
    if (shopping.amount === 0) {
      shopping.amount++;
    }
    shopping.updateTotal();
  }

  decreaseAmount(shopping: Shopping) {
    shopping.amount--;
    if (shopping.amount === 0) {
      shopping.amount--;
      shopping.committed = true;
    }
    shopping.updateTotal();
  }

  discountLabel(shopping: Shopping): string {
    return this.isArticleVarious(shopping.code) ? '' : '' + shopping.discount;
  }

  isArticleVarious(code: string) {
    return ShoppingCartService.isArticleVarious(code);
  }

  exchange() {
    this.shoppingCartService.exchange();
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  delete(orderArticle: OrderArticle) {
    this.orderService.deleteOrder(orderArticle);
  }

  stockLabel(): string {
    return (this.shoppingCartService.getLastArticle()) ? 'Stock of ' + this.shoppingCartService.getLastArticle().description : 'Stock';
  }

  stockValue(): number {
    return (this.shoppingCartService.getLastArticle()) ? this.shoppingCartService.getLastArticle().stock : undefined;
  }

  isEmpty(): boolean {
    return this.shoppingCartService.isEmpty();
  }
}
