import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TokensService} from '../core/tokens.service';
import {CancelYesDialogComponent} from '../core/cancel-yes-dialog.component';
import {CashierService} from './shared/cashier.service';
import {AdminsService} from './admins/admins.service';
import {UserService} from './users/user.service';
import {DbSeedDialogComponent} from './admins/db-seed-dialog.component';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened.component';
import {CashierClosureDialogComponent} from './cashier-opened/cashier/cashier-closure-dialog.component';
import {CashMovementDialogComponent} from './cashier-opened/shared/cash-movement/cash-movement-dialog.component';
import {UsersComponent} from './users/users.component';
import {ProvidersComponent} from './providers/providers.component';
import {ProfileDialogComponent} from './users/profile-dialog.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticlesFamiliesCRUDComponent} from './articles-families/articles-families.component';
import {FamilySizesCreationComponent} from './cashier-opened/articles-family/family-sizes-creation.component';
import {OffersComponent} from './offers/offers.component';
import {StockPredictionComponent} from './stock-prediction/stock-prediction.component';
import {TicketsComponent} from './tickets/tickets.component';
import {OrderComponent} from './order/order.component';
import {OperatorManagerComponent} from './operator-manager/operator-manager.component';
import {RGPDComponent} from './rgpd/rgpd.component';

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

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  isManager(): boolean {
    return this.tokensService.isManager();
  }

  isOperator(): boolean {
    // TODO fix this error!
    return false; // this.tokensService.isOperator();
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
    this.dialog.open(ProfileDialogComponent);
  }

  logout() {
    this.tokensService.logout();
  }

  closeCashier() {
    this.dialog.open(CashierClosureDialogComponent).afterClosed().subscribe(
      () => this.cashier()
    );
  }

  openCashier() {
    this.cashierService.open().subscribe(
      () => this.cashier()
    );
  }

  cashMovement() {
    this.dialog.open(CashMovementDialogComponent);
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
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }

  ticketTracking() {
  }

  invoices() {
  }

  article() {
    this.router.navigate([HomeComponent.URL, ArticlesComponent.URL]);
  }

  articlesFamily() {
    this.router.navigate([HomeComponent.URL, ArticlesFamiliesCRUDComponent.URL]);
  }

  createFamilySizes() {
    this.dialog.open(FamilySizesCreationComponent);
  }

  providers() {
    this.router.navigate([HomeComponent.URL, ProvidersComponent.URL]);
  }

  tags() {
  }

  budgets() {
  }

  Orders() {
    this.router.navigate([HomeComponent.URL, OrderComponent.URL]);
  }

  offers() {
    this.router.navigate([HomeComponent.URL, OffersComponent.URL]);
  }

  operatorManager() {
    this.router.navigate([HomeComponent.URL, OperatorManagerComponent.URL]);
  }
  stockAlarm() {
    // this.router.navigate([HomeComponent.URL, AlarmsComponent.URL]);
  }

  stockManager() {
  }

  stockPrediction() {
    this.router.navigate([HomeComponent.URL, StockPredictionComponent.URL]);
  }

  rgpd() {
    this.router.navigate([HomeComponent.URL, RGPDComponent.URL]);
  }

}
