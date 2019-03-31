import {Component} from '@angular/core';

import {Order} from './order.model';
import {OrderService} from './order.service';
import {MatDialog} from '@angular/material';
import {OrderSearch} from './order-search.model';
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  static URL = 'orders';
  orderSearch: { descriptionOrders: string; descriptionArticles: string; onlyClosingDate: boolean };
  order: { descriptionOrders: string; descriptionArticles: string; onlyClosingDate: boolean };
  data: Order[];
  title = 'Order management';
  columns = ['descriptionOrders', 'descriptionArticles', 'requiredAmount', 'finalAmount', 'openingDate', 'closingDate'];

  constructor(private orderService: OrderService, private  dialog: MatDialog) {
    this.order = { descriptionOrders: '', descriptionArticles: '', onlyClosingDate: false };
    this.data = null;
    this.orderSearch = { descriptionOrders: '' , descriptionArticles: '', onlyClosingDate: false };
  }

  readAll() {
    this.orderService.readAll().subscribe(
      data => this.data = data
    );
    // console.log('data: ' +  this.data);
  }

  search() {
    this.orderService.readSearch(this.orderSearch).subscribe(
      data => this.data = data
    );
  }

  resetSearch() {
    this.orderSearch = {descriptionOrders: '', descriptionArticles: '' , onlyClosingDate: false };
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

  closeOrderModal($event): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: $event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.closeOrderModal = result;
    });
  }
}
