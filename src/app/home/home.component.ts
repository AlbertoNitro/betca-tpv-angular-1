import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {TokensService} from '../core/tokens.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;

  constructor(private router: Router, private tokensService: TokensService) {
    this.cashierClosed = true;
    this.cashier();
  }

  cashier() {
    this.username = 'admin';
    this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
  }

  profile() {
  }

  logout() {
    this.tokensService.logout();
  }

  closeCashier() {
  }

  openCashier() {
  }

  cashMovement() {
  }

  cashierClosure() {
  }

  customers() {
  }

  vouchers() {
  }

  statistics() {
  }

  tickets() {
  }

  ticketTracking() {
  }

  invoices() {
  }

  article() {
  }

  articlesFamily() {
  }

  createFamilySizes() {
  }

  providers() {
  }

  tags() {
  }

  budgets() {
  }

  Orders() {
  }

}
