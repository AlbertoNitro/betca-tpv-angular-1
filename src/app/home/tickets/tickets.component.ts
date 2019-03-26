import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {ShoppingTicket} from './models/shopping-ticket.model';
import {ShoppingState} from './models/shopping-state.enum';
import {GenericMatSelect} from '../shared/generic-mat-select.model';
import {Ticket} from './models/ticket.model';
import {TicketsService} from './tickets.service';
import {TicketQueryInput} from './models/ticket-query-input.model';
import {TicketQueryOutput} from './models/ticket-query-output.model';

@Component({
  selector: 'app-tickets',
  styleUrls: ['./tickets.component.css'],
  templateUrl: './tickets.component.html'
})

export class TicketsComponent {

  static URL = 'tickets';
  AdvancedQuery = '/query';
  AdvancedQueryByOrderId = '/orderId';
  ticket: Ticket;
  ticketQueryInput: TicketQueryInput = {userMobile: null, dateStart: null, dateEnd: null,
    totalMin: null, totalMax: null, orderId: null, pending: null};
  ticketQueryOuput: TicketQueryOutput[];
  advancedTicketQueryPending = false;
  advancedTicketQueryOrderIdPending = false;
  isTicketFound: boolean;
  ticketCode: string;
  ticketTotal: number;
  matSelectStates: GenericMatSelect[];
  customizedMatSelectStates: GenericMatSelect[];
  dataSource: MatTableDataSource<ShoppingTicket>;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'totalPrice', 'shoppingState'];

  constructor(private ticketsService: TicketsService) {
    this.isTicketFound = false;
    this.ticketCode = '0';
    this.ticketTotal = 0;
    this.matSelectStates = [
      {value: ShoppingState.NotCommited, viewValue: 'Not Commited'},
      {value: ShoppingState.InStock, viewValue: 'In Stock'},
      {value: ShoppingState.Sending, viewValue: 'Sending'},
      {value: ShoppingState.Commited, viewValue: 'Commited'}
    ];
    this.customizedMatSelectStates = this.matSelectStates;
  }

  choosePossibleStates = (selectedState => {
    switch ( selectedState ) {
      case ShoppingState.NotCommited:
        return this.matSelectStates.filter(status => status.value !== ShoppingState.NotCommited);
      case ShoppingState.InStock:
        return this.matSelectStates.filter(status =>
          (status.value === ShoppingState.Sending || status.value === ShoppingState.Commited));
      case ShoppingState.Sending:
      case ShoppingState.Commited:
        return this.matSelectStates.filter(status => status.value === ShoppingState.Commited);
    }
  });

  static updateTotal(shoppingTicket: ShoppingTicket): void {
    const value = shoppingTicket.retailPrice * shoppingTicket.amount * (1 - shoppingTicket.discount / 100);
    shoppingTicket.totalPrice = Math.round(value * 100) / 100;
  }

  searchTicketById(code: string) {
    this.ticket = this.ticketsService.readOne(code);
    this.fillData(code);
  }

  fillData(code: string) {
    this.ticketCode = code;
    this.dataSource = new MatTableDataSource<ShoppingTicket>(this.ticket.shoppingTicket);
    this.isTicketFound = true;
    this.ticketTotal = this.ticket.total;
  }

  reset() {
    this.searchTicketById(this.ticketCode);
  }

  save() {
    this.ticketsService.createNewTicket(this.ticket);
  }

  decreaseAmount(shoppingTicket: ShoppingTicket) {
    if (shoppingTicket.amount > 0) {
      shoppingTicket.amount--;
    }
    TicketsComponent.updateTotal(shoppingTicket);
    this.synchronizeTicketTotal();
  }

  synchronizeTicketTotal(): void {
    let total = 0;
    for (const shopping of this.ticket.shoppingTicket) {
      total = total + shopping.totalPrice;
    }
    this.ticketTotal = Math.round(total * 100) / 100;
    this.ticket.total = this.ticketTotal;
  }

  initializeCustomizedMatSelectStates(state) {
   this.customizedMatSelectStates = this.choosePossibleStates(state);
  }

  manageMatSelectOptions (actualState, shoppingTicket) {
    shoppingTicket.shoppingState = actualState.value;
    this.customizedMatSelectStates = this.choosePossibleStates(actualState.value);
  }

  advancedTicketQuery(path: string, ticketQueryInput: TicketQueryInput) {
    this.ticketsService.advancedTicketQuery(path, ticketQueryInput).subscribe(
      data => this.ticketQueryOuput = data
    );
  }

  advancedTicketQueryNormal(path: string, ticketQueryInput: TicketQueryInput) {
    ticketQueryInput.pending = this.advancedTicketQueryPending;
    this.advancedTicketQuery(path, ticketQueryInput);
  }

  advancedTicketQueryOrderId(path: string, ticketQueryInput: TicketQueryInput) {
    ticketQueryInput.pending = this.advancedTicketQueryOrderIdPending;
    this.advancedTicketQuery(path, ticketQueryInput);
  }

  resetAdvancedSearch() {
    this.ticketQueryInput = {userMobile: null, dateStart: null, dateEnd: null,
      totalMin: null, totalMax: null, pending: null, orderId: null};
  }
}


