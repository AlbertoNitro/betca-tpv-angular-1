import {Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog, MatTableDataSource} from '@angular/material';
import {Order} from './order.model';
import {OrderService} from './order.service';
import {OrderArticle} from './order-article.model';
import {ProviderService} from '../providers/provider.service';
import {Provider} from '../providers/provider.model';
import {ArticleService} from '../shared/article.service';
import {Article} from '../shared/article.model';
import {ShoppingCartService} from '../cashier-opened/shopping-cart/shopping-cart.service';
import {ShoppingCartComponent} from '../cashier-opened/shopping-cart/shopping-cart.component';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';
import {ArticleQuickCreationDialogComponent} from '../cashier-opened/shopping-cart/article-quick-creation-dialog.component';
import {CheckOutDialogComponent} from '../cashier-opened/shopping-cart/check-out-dialog.component';

@Component({
  templateUrl: 'order-save-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']

})
export class OrderSaveDialogComponent implements OnInit {

  mode: string;
  order: {} = {};
  // order: { descriptionOrders: string; descriptionArticles: string; onlyClosingDate: boolean };
  orderArticle: Article[];
  providers: Provider[];
  // data: Article[];
  title = 'Articles from providers';
  columns = [];
  displayedColumns = ['id', 'description', 'amount', 'price', 'actions'];
  dataTAbleArticles: MatTableDataSource<Article>;
  // static URL1 = 'cashier-opened';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService, private providerService: ProviderService,
              private  articleService: ArticleService, private  dialog: MatDialog, private shoppingCartService: ShoppingCartService) {
    console.log('data:' + data);
    this.mode = data.mode;
    this.columns = data.columns;
    if (this.mode === 'update') {
      // this.order = data.order;
    }
    this.orderService.shoppingCartObservable().subscribe(
      result => {
        console.log('00000000000');
        console.log(result);
        this.dataTAbleArticles = new MatTableDataSource<Article>(result);
        console.log(this.dataTAbleArticles);
      }
    );
  }

  ngOnInit() {
    this.getProviderActive();
    // this.getArticlesByProvider('1');
  }

  getProviderActive() {
    this.providerService.readAllActives().subscribe(
      data => {
        this.providers = data,
          console.log(this.providers);
      }
    );
  }

  getArticlesByProvider(id: string) {
    this.articleService.readArticlesByProvider(id).subscribe(
      data => {
        this.orderArticle = data,
          console.log('this.orderArticle' + this.orderArticle),
          console.log('id: ' + id);
      }
    );
    this.getProviderActive();
  }

  saveArtcileSelect() {
    console.log('saveArticleSelect');
  }

  update() {
    // this.orderService.update(this.order).subscribe();
  }

  create() {
    // this.orderService.create(this.order).subscribe();
  }

  onclick() {
    if (this.mode === 'update') {
      this.update();
    } else if (this.mode === 'create') {
      this.create();
    }
  }

  addArticleOrderList(code: string) {
    this.orderService.addArticleOrderList(code).subscribe(
      result => {
        console.log('fffffff');
      }
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
    // this.shoppingCartService.synchronizeCartTotal();
  }

  decreaseAmount(shopping: Shopping) {
    shopping.amount--;
    if (shopping.amount === 0) {
      shopping.amount--;
      shopping.committed = true;
    }
    shopping.updateTotal();
    // this.shoppingCartService.synchronizeCartTotal();
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

  delete(shopping: Shopping) {
    this.orderService.delete(shopping);
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
