import {Component} from '@angular/core';
import {Order} from './order.model';
import {User} from '../users/user.model';
import {OrderService} from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  static URL = 'orders';

  data: Order[];
  title = 'Order management';
  columns = ['description'];

  constructor(private orderService: OrderService) {
    this.orderService.readAll().subscribe(
      data => this.data = data
    );
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
