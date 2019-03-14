import { Component } from '@angular/core';

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
  price: number;
  state: string;
  totalPrice: number;
}

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html'
})

export class TicketsComponent {
  static URL = 'tickets';
  shoppingCart: ShoppingCart = {
    description: 'Blue Jeans',
    amount: 0,
    discount: 0,
    price: 0,
    state: 'IN_STOCK',
    totalPrice: 0
  };
  ticket: Ticket = {
    code: '0',
    date: '05/03/2019 17:15:55',
    shoppingCart: [this.shoppingCart] ,
    cart: 0,
    cash: 0,
    voucher: 0,
    total: 0
  };

  searchTicketById(code: string) {
    // TODO: Create API Call
    console.log('Searching Ticket with id: ', code);
    this.ticket.code = code;
  }
}


