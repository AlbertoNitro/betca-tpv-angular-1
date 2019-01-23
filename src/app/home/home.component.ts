import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {TokensService} from '../core/tokens.service';
import {CashierService} from './shared/cashier.service';
import {UserService} from './users/user.service';
import {AdminsService} from './admins/admins.service';
import {CancelYesDialogComponent} from '../core/cancel-yes-dialog.component';
import {DbSeedDialogComponent} from './admins/db-seed-dialog.component';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened.component';
import {CashierCloseDialogComponent} from './cashier-opened/cashier-closure/cashier-close-dialog.component';
import {UsersComponent} from './users/users.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;

  constructor(private router: Router, private dialog: MatDialog,
              private tokensService: TokensService, private userService: UserService, private cashierService: CashierService,
              private adminsService: AdminsService) {
    this.username = tokensService.getName();
    this.cashierClosed = true;
    this.cashier();
  }

  cashier() {
    this.cashierService.isClosedCashier().subscribe(
      closed => {
        this.cashierClosed = closed;
        if (closed) {
          this.router.navigate([HomeComponent.URL, CashierClosedComponent.URL]);
        } else {
          this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
        }
      }
    );
  }

  deleteDb() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.adminsService.deleteDb();
        }
      });
  }

  seedDb() {
    this.dialog.open(DbSeedDialogComponent);
  }


  profile() {
  }

  logout() {
    this.tokensService.logout();
  }

  closeCashier() {
    this.dialog.open(CashierCloseDialogComponent).afterClosed().subscribe(
      () => this.cashier()
    );
  }

  openCashier() {
    this.cashierService.open().subscribe(
      () => this.cashier()
    );
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
