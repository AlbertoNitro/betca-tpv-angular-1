import {Component} from '@angular/core';
import {Order} from './order.model';
import {User} from '../users/user.model';
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
  columns = ['Description orders', 'Description articles', 'Required amount', 'Final amount', 'Opening date', 'Closing date'];

  constructor(private orderService: OrderService, private  dialog: MatDialog) {
    this.order = {descriptionOrders: null, descriptionArticles: null };
    this.data = null;
  }

  search() {
    // TODO implement search with fields
    this.orderService.readAll().subscribe(
      data => this.data = data
    );
  }

  resetSearch() {
    this.order = {descriptionOrders: null, descriptionArticles: null };
  }

  create() {
    // TODO
  }

  read(user: User) {
    // TODO
  }

  update(user: User) {
    // TODO
  }

  delete(user: User) {
    // TODO
  }
}
