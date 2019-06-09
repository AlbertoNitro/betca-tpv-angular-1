import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

import {CoreModule} from './core/core.module';
import {CashierService} from './home/shared/cashier.service';
import {AlarmService} from './home/alarms/alarm.service';
import {ArticleService} from './home/shared/article.service';
import {BudgetService} from './home/budgets/budget.service';
import {CashierClosureService} from './home/cashier-opened/cashier/cashier-closure.service';
import {CashMovementService} from './home/cashier-opened/shared/cash-movement/cash-movement.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {AdminsService} from './home/admins/admins.service';
import {UserService} from './home/users/user.service';
import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsService} from './home/stadistics/statistics.service';
import {StockManagerService} from './home/stock-manager/stock-manager.service';
import {ProviderService} from './home/providers/provider.service';
import {OfferService} from './home/offers/offer.service';
import {OrderService} from './home/order/order.service';
import {ArticleFamilyService} from './home/articles-families/shared/articles-families.service';
import {VoucherService} from './home/shared/voucher.service';
import {ModalComponent} from './home/order/modal/modal.component';
import {TicketsService} from './home/tickets/tickets.service';
import {ArticleFamilyViewService} from './home/cashier-opened/articles-family/articles-families-view.service';
import {RgpdService} from './home/rgpd/rgpd.service';
import {InvoiceUpdateService} from './home/invoice/invoice-update.service';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NegativeInvoiceDialogComponent} from './home/invoice/negative-invoice-dialog.component';
import {InvoiceService} from "./home/invoice/invoice.service";

@NgModule({
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule

  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOGS,
    ModalComponent
  ],
  entryComponents: [AppRoutingModule.DIALOGS, ModalComponent],
  providers: [
    AdminsService,
    AlarmService,
    ArticleFamilyService,
    ArticleFamilyViewService,
    ArticleService,
    BudgetService,
    CashierClosureService,
    CashierService,
    CashMovementService,
    InvoiceUpdateService,
    MatFormFieldModule,
    MatInputModule,
    ShoppingCartService,
    StatisticsService,
    StockManagerService,
    UserService,
    ProviderService,
    TicketsService,
    UserService,
    OfferService,
    OrderService,
    RgpdService,
    VoucherService,
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
