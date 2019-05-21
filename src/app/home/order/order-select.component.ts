import {Component, EventEmitter, Output} from '@angular/core';
import {OrderService} from './order.service';
import {Order} from './order.model';

@Component({
  selector: 'app-order-select',
  templateUrl: 'order-select.component.html'
})
export class OrderSelectComponent {

  orders: Order[];
  @Output() change = new EventEmitter<string>();

  constructor(private orderService: OrderService) {
    this.orderService.readAll().subscribe(
      data => this.orders = data
    );
  }

  onChange(selected) {
    this.change.emit(selected);
  }

}
