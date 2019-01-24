import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import {TicketCreation} from './ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';

@Component({
  templateUrl: 'check-out-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class CheckOutDialogComponent {

  total: number;

  requestedInvoice = false;

  ticketCreation: TicketCreation;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private shoppingCartService: ShoppingCartService) {

    this.total = data.total;
    this.ticketCreation = data.ticketCreation;
  }

  uncommited() {
    return this.shoppingCartService.uncommitArticlesExist();
  }

  totalCommited() {
    return this.shoppingCartService.getTotalCommited();
  }

  warning(): boolean {
    return (!this.ticketCreation.userMobile) && this.shoppingCartService.uncommitArticlesExist();
  }

  returnedAmount(): number {
    return Math.round(
      (0 + this.formatNumber(this.ticketCreation.cash)
        + this.formatNumber(this.ticketCreation.card)
        + this.formatNumber(this.ticketCreation.voucher)
        - this.total) * 100
    ) / 100;
  }

  returnedCash(): number {
    if (this.ticketCreation.cash >= this.returnedAmount()) {
      return this.returnedAmount();
    } else {
      return this.ticketCreation.cash;
    }
  }

  fillCard() {
    if (this.returnedAmount() < 0) {
      this.ticketCreation.card = -this.returnedAmount();
    } else {
      this.ticketCreation.card = this.total;
      this.ticketCreation.cash = 0;
    }
  }

  fillCash() {
    this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
    if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
      this.ticketCreation.cash = -this.returnedAmount();
    } else if (this.ticketCreation.cash < 20) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
    } else if (this.ticketCreation.cash < 50) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
    } else {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
    }
  }

  consumeVoucher() {
    // TODO consumir un vale que se entrega como parte del pago
  }

  invalidCheckOut(): boolean {
    return (this.total + this.returnedAmount() - this.shoppingCartService.getTotalCommited() < -0.01); // perdida en operaciones
  }

  checkOut() {
    const returned = this.returnedAmount();
    const cash = this.ticketCreation.cash;
    let voucher = 0;
    this.formatValues();
    if (returned > 0) {
      this.ticketCreation.cash -= returned;
    }

    if (this.ticketCreation.cash < 0) {
      voucher = -this.ticketCreation.cash;
      this.ticketCreation.cash = 0;
    }

    this.ticketCreation.note = '';
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.note += ' Pay with card: ' + Math.round(this.ticketCreation.card * 100) / 100 + '.';
    }
    if (this.ticketCreation.voucher > 0) {
      this.ticketCreation.note += ' Pay with voucher: ' + Math.round(this.ticketCreation.voucher * 100) / 100 + '.';
    }
    if (this.ticketCreation.cash > 0) {
      this.ticketCreation.note += ' Pay with cash: ' + Math.round(cash * 100) / 100 + '.';
    }
    if (returned > 0) {
      this.ticketCreation.note += ' Return: ' + Math.round(returned * 100) / 100 + '.';
    }
    this.shoppingCartService.checkOut(this.ticketCreation).subscribe(
      () => {
        if (voucher > 0) {
          // TODO crear un vale como parte del pago
        } else {
          this.createInvoice();
        }
      }
    );
  }

  createInvoice() {
    if (this.requestedInvoice) {
      // TODO crear una factura
    } else {
      this.dialog.closeAll();
    }
  }

  invalidInvoice(): boolean {
    return true;
  }

  private formatNumber(value: number): number {
    return ((value === undefined || value === null) ? 0 : value);
  }

  private formatValues() {
    this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
    this.ticketCreation.card = this.formatNumber(this.ticketCreation.card);
    this.ticketCreation.voucher = this.formatNumber(this.ticketCreation.voucher);
  }

}
