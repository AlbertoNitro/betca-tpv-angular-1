import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Ticket } from './model/ticket.model';
import {ShoppingTicket} from './model/shopping-ticket.model';
import {ShoppingState} from './model/shopping-state.enum';
import {GenericMatSelect} from '../shared/generic-mat-select.model';

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html'
})

export class TicketsComponent {
  static URL = 'tickets';
  shoppingTicket: ShoppingTicket[] = [
    {
      description: 'Blue Jeans',
      amount: 0,
      discount: 0,
      retailPrice: 0,
      shoppingState: ShoppingState.InStock,
      totalPrice: 0,
    }
  ] ;
  ticket: Ticket = {
    code: '0',
    date: '05/03/2019 17:15:55',
    shoppingTicket: this.shoppingTicket ,
    total: 0
  };
  matSelectStates: GenericMatSelect[] = [
    {value: ShoppingState.NotCommited, viewValue: 'Not Commited'},
    {value: ShoppingState.InStock, viewValue: 'In Stock'},
    {value: ShoppingState.Sending, viewValue: 'Sending'},
    {value: ShoppingState.Commited, viewValue: 'Commited'}
  ];
  dataSource: MatTableDataSource<ShoppingTicket>;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'totalPrice', 'shoppingState'];

  constructor() {
    this.dataSource = new MatTableDataSource<ShoppingTicket>(this.shoppingTicket);
  }
  searchTicketById(code: string) {
    // TODO: Create API Call
    console.log('Searching Ticket with id: ', code);
    this.ticket.code = code;
  }

  reset() {
    this.searchTicketById(this.ticket.code);
  }

  // TODO: Review if is necessary increment amount or not
  incrementAmount(shoppingTicket: ShoppingTicket) {
    shoppingTicket.amount++;
  }

  decreaseAmount(shoppingTicket: ShoppingTicket) {
    if (shoppingTicket.amount > 0) {
      shoppingTicket.amount--;
    }
  }
}


