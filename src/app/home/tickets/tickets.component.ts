import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {ShoppingTicket} from './models/shopping-ticket.model';
import {ShoppingState} from './models/shopping-state.enum';
import {GenericMatSelect} from '../shared/generic-mat-select.model';
import {Ticket} from './models/ticket.model';
import {TicketsService} from './tickets.service';

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html'
})

export class TicketsComponent {
  static URL = 'tickets';
  ticket: Ticket;
  isTicketFound: boolean;
  ticketCode: string;
  ticketTotal: number;
  matSelectStates: GenericMatSelect[] = [
    {value: ShoppingState.NotCommited, viewValue: 'Not Commited'},
    {value: ShoppingState.InStock, viewValue: 'In Stock'},
    {value: ShoppingState.Sending, viewValue: 'Sending'},
    {value: ShoppingState.Commited, viewValue: 'Commited'}
  ];
  dataSource: MatTableDataSource<ShoppingTicket>;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'totalPrice', 'shoppingState'];

  constructor(private ticketsService: TicketsService) {
    this.isTicketFound = false;
    this.ticketCode = '0';
    this.ticketTotal = 0;
  }

  searchTicketById(code: string) {
    this.ticket = this.ticketsService.readOne(code);
    this.fillData();
  }

  fillData() {
    this.dataSource = new MatTableDataSource<ShoppingTicket>(this.ticket.shoppingTicket);
    this.isTicketFound = true;
    this.ticketCode = this.ticket.code;
    this.ticketTotal = this.ticket.total;
  }

  reset() {
    this.searchTicketById(this.ticket.code);
  }

  save() {
    this.ticketsService.createNewTicket(this.ticket);
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


