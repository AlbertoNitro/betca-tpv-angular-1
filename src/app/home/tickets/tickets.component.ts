import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';

export interface Ticket {
  code: string;
  date: string;
  shoppingCart: Array<ShoppingCart>;
  cart: number;
  cash: number;
  voucher: number;
  total: number;
}

export interface ShoppingCart {
  description: string;
  amount: number;
  discount: number;
  retailPrice: number;
  state: string;
  totalPrice: number;
}

export interface  Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html'
})

export class TicketsComponent {
  static URL = 'tickets';
  shoppingCart: ShoppingCart[] = [
    {
      description: 'Blue Jeans',
      amount: 0,
      discount: 0,
      retailPrice: 0,
      state: 'IN_STOCK',
      totalPrice: 0,
    }
  ] ;
  ticket: Ticket = {
    code: '0',
    date: '05/03/2019 17:15:55',
    shoppingCart: this.shoppingCart ,
    cart: 0,
    cash: 0,
    voucher: 0,
    total: 0
  };
  status: Status[] = [
    {value: 'NOT-COMMITED', viewValue: 'Not Commited'},
    {value: 'IN-STOCK', viewValue: 'In Stock'},
    {value: 'SENDING', viewValue: 'Sending'},
    {value: 'COMMITED', viewValue: 'Commited'}
  ];
  dataSource: MatTableDataSource<ShoppingCart>;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'totalPrice', 'status'];

  constructor() {
    this.dataSource = new MatTableDataSource<ShoppingCart>(this.shoppingCart);
  }
  searchTicketById(code: string) {
    // TODO: Create API Call
    console.log('Searching Ticket with id: ', code);
    this.ticket.code = code;
  }

  // TODO: Review if is necessary increment amount or not
  incrementAmount(shopping: ShoppingCart) {
    shopping.amount++;
  }

  decreaseAmount(shopping: ShoppingCart) {
    if (shopping.amount > 0) {
      shopping.amount--;
    }
  }

}


