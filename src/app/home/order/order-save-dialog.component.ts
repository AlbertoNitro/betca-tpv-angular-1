import {Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material';
import {Order} from './order.model';
import {OrderService} from './order.service';
import {OrderProvider} from './order-provider.model';
import {OrderArticle} from './order-article.model';

@Component({
  templateUrl: 'order-save-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']

})
export class OrderSaveDialogComponent implements OnInit {

  mode: string;
  order: Order = {};
  orderProvider: OrderProvider[];
  orderArticle: OrderArticle[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private orderService: OrderService) {
    this.mode = data.mode;
    if (this.mode === 'update') {
      this.order = data.order;
    }
  }

  ngOnInit() {
    this.getProviderActive();
  }

  getProviderActive() {
    this.orderService.readAllActives().subscribe(
      orderProvider => {
        this.orderProvider = orderProvider,
          console.log(orderProvider);
      }
    );
  }

  getArticlesByProvider(id: string) {
    this.orderService.readArticlesByProvider(id).subscribe(
      data => this.orderArticle = data
    );
  }

  saveArtcileSelect() {
    console.log('saveArticleSelect');
  }

  update() {
    this.orderService.update(this.order).subscribe();
  }

  create() {
    this.orderService.create(this.order).subscribe();
  }

  onclick() {
    if (this.mode === 'update') {
      this.update();
    } else if (this.mode === 'create') {
      this.create();
    }
  }
}
