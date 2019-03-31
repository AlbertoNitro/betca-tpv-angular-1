import { Component } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ShoppingTicket} from './models/shopping-ticket.model';
import {ShoppingState} from './models/shopping-state.enum';
import {GenericMatSelect} from '../shared/generic-mat-select.model';
import {Ticket} from './models/ticket.model';
import {TicketsService} from './tickets.service';
import {TicketQueryInput} from './models/ticket-query-input.model';
import {TicketQueryOutput} from './models/ticket-query-output.model';
import {VoucherMin} from '../shared/voucher-min.model';
import {VoucherService} from '../shared/voucher.service';

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
  hasAdvancedQueryResults: boolean;
  isTicketFound: boolean;
  ticketCode: string;
  ticketTotal: number;
  matSelectStates: GenericMatSelect[];
  customizedMatSelectStates: GenericMatSelect[];
  dataSource: MatTableDataSource<ShoppingTicket>;
  dataSourceQuery: MatTableDataSource<TicketQueryOutput>;
  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'totalPrice', 'shoppingState'];
  displayedColumnsQuery: string[] = ['id', 'creationDate', 'total', 'details'];
  initialShoppingStates: string[];
  isShoppingStateShown: boolean;
  voucher: VoucherMin = { value: null};

  constructor(
    private ticketsService: TicketsService,
    private dialog: MatDialog,
    private voucherService: VoucherService,
    private snackBar: MatSnackBar) {

    this.isTicketFound = false;
    this.hasAdvancedQueryResults = false;
    this.ticketCode = '0';
    this.ticketTotal = 0;
    this.initialShoppingStates = [];
    this.matSelectStates = [
      {value: ShoppingState.NOT_COMMITTED, viewValue: ShoppingState.NOT_COMMITTED},
      {value: ShoppingState.IN_STOCK, viewValue: ShoppingState.IN_STOCK},
      {value: ShoppingState.SENDING, viewValue: ShoppingState.SENDING},
      {value: ShoppingState.COMMITTED, viewValue: ShoppingState.COMMITTED}
    ];
    this.customizedMatSelectStates = this.matSelectStates;
    this.isShoppingStateShown = false;
    this.voucher.value = 0;
  }

  static updateTotal(shoppingTicket: ShoppingTicket): void {
    const value = shoppingTicket.retailPrice * shoppingTicket.amount * (1 - shoppingTicket.discount / 100);
    shoppingTicket.totalPrice = Math.round(value * 100) / 100;
  }

  static isStateValid(initialState: string, actualState: string) {
    let isValid;
    switch (initialState) {
      case ShoppingState.NOT_COMMITTED:
        isValid = true;
        break;
      case ShoppingState.IN_STOCK:
        isValid = ShoppingState.NOT_COMMITTED !== actualState;
        break;
      case ShoppingState.SENDING:
        isValid = ShoppingState.SENDING === actualState || ShoppingState.COMMITTED === actualState;
        break;
      case ShoppingState.COMMITTED:
        isValid = ShoppingState.COMMITTED === actualState;
        break;
    }
    return isValid;
  }

  choosePossibleStates(selectedState) {
    switch ( selectedState ) {
      case ShoppingState.NOT_COMMITTED:
        return this.matSelectStates;
      case ShoppingState.IN_STOCK:
        return this.matSelectStates.filter(status => (status.value !== ShoppingState.NOT_COMMITTED));
      case ShoppingState.SENDING:
        return this.matSelectStates.filter(status =>
          (status.value === ShoppingState.SENDING || status.value === ShoppingState.COMMITTED));
      case ShoppingState.COMMITTED:
        return this.matSelectStates.filter(status => status.value === ShoppingState.COMMITTED);
    }
  }

  searchTicketById(code: string) {
    this.ticketsService.readOne(code).subscribe(ticket => {
      this.ticket = ticket;
      this.fillData(code);
      },
      () => {
      this.isTicketFound = false;
      });
  }

  fillData(code: string) {
    const shoppingTicket = this.ticket.shoppingList;
    this.initialShoppingStates = [];
    shoppingTicket.forEach(p => this.initialShoppingStates.push(p.shoppingState));
    this.ticketCode = code;
    this.dataSource = new MatTableDataSource<ShoppingTicket>(this.ticket.shoppingList);
    this.isTicketFound = true;
    this.hasAdvancedQueryResults = false;
    this.voucher.value = 0;
    this.ticketTotal = 0;
    this.synchronizeTicketTotal();
  }

  reset() {
    this.isShoppingStateShown = false;
    this.ticketTotal = 0;
    this.searchTicketById(this.ticketCode);
  }

  isShoppingStatesValid () {
    let isValid = true;
    const shoppingTicket = this.ticket.shoppingList;
    for (let i = 0; i < this.ticket.shoppingList.length; i++) {
      if (!TicketsComponent.isStateValid(this.initialShoppingStates[i], shoppingTicket[i].shoppingState)) {
        isValid = false;
      }
    }
    return isValid;
  }

  save() {
    const isValid = this.isShoppingStatesValid();
    if (isValid) {
      this.ticketsService.updateTicket(this.ticketCode, this.ticket).subscribe(() => {
        this.isTicketFound = false;
        if (this.voucher.value !== 0) {
          this.voucherService.create(this.voucher).subscribe();
        }
        setTimeout(() => {
          this.snackBar.open('The ticket was updated. Wait to print it.', 'Success', {
            duration: 3500,
          });
        }, 2000);
      });
    } else {
      this.snackBar.open('States are not valid. Try again', 'Error', {
        duration: 3000
      });
    }
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
    for (const shopping of this.ticket.shoppingList) {
      total = total + shopping.totalPrice;
    }
    const updatedRoundedTotal = Math.round(total * 100) / 100;
    if (this.ticketTotal !== 0) {
     this.voucher.value += this.ticketTotal - updatedRoundedTotal;
    }
    this.ticketTotal = updatedRoundedTotal;
  }

  showShoppingStates() {
    this.isShoppingStateShown = true;
  }

  chooseCustomizedMatSelectStates(state) {
    if (this.isShoppingStateShown) {
      return this.choosePossibleStates(state);
    } else {
      return this.customizedMatSelectStates;
    }
  }

  manageMatSelectOptions (actualState, shoppingTicket) {
    shoppingTicket.shoppingState = actualState.value;
    this.customizedMatSelectStates = this.choosePossibleStates(actualState.value);
  }

  advancedTicketQuery(path: string, ticketQueryInput: TicketQueryInput) {
    this.ticketsService.advancedTicketQuery(path, ticketQueryInput).subscribe(
      data => {this.ticketQueryOuput = data;
        this.hasAdvancedQueryResults = true;
        this.isTicketFound = false;
        this.dataSourceQuery = new MatTableDataSource<TicketQueryOutput>(this.ticketQueryOuput); },
      error => {
        console.log(error);
      });
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
    this.hasAdvancedQueryResults = false;
  }
}


