import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened.component';
import {CashierService} from './shared/cashier.service';
import {TokensService} from '../core/tokens.service';
import {UserService} from './shared/user.service';
import {UsersComponent} from './users/users.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;

  constructor(private router: Router, private tokensService: TokensService, private userService: UserService,
              private cashierService: CashierService) {
    this.username = '???';
    this.userService.sessionUsername().subscribe(
      user => this.username = user.username
    );
    this.cashierClosed = true;
    this.cashier();
  }

  cashier() {
    this.cashierService.last().subscribe(
      cashierLast => {
        this.cashierClosed = cashierLast.closed;
        if (cashierLast.closed) {
          this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
        } else {
          this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
        }
      }
    );
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
    this.router.navigate([HomeComponent.URL, UsersComponent.URL]);
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
