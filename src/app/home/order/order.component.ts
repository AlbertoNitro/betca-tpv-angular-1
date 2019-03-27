import {Component} from '@angular/core';

import {Order} from './order.model';
import {OrderService} from './order.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  static URL = 'orders';
  onlyClosingDate = false;
  order: { descriptionOrders: null; descriptionArticles: null };
  data: Order[];
  title = 'Order management';
  columns = ['descriptionOrders', 'descriptionArticles', 'requiredAmount', 'finalAmount', 'openingDate', 'closingDate'];

  constructor(private orderService: OrderService, private  dialog: MatDialog) {
    this.order = {descriptionOrders: null, descriptionArticles: null };
    this.data = null;
  }

  search() {
    // TODO implement search with fields
    this.orderService.readAll().subscribe(
      data => this.data = data
    );
    console.log('data: ' +  this.data);
  }

  resetSearch() {
    this.order = {descriptionOrders: null, descriptionArticles: null };
  }

  create() {
    // TODO
  }

  read(user: Order) {
    // TODO
  }

  update(user: Order) {
    // TODO
  }

  delete(user: Order) {
    // TODO
  }
}
