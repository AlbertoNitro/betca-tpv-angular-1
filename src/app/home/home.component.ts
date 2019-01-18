import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {TokensService} from '../core/tokens.service';
import {UserService} from './shared/user.service';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;

  constructor(private router: Router, private tokensService: TokensService, private userService: UserService) {
    this.username = '???';
    this.userService.sessionUsername().subscribe(
      user => this.username = user.username
    );
    this.cashierClosed = true;
    this.cashier();
  }

  cashier() {
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
