import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

import {CoreModule} from './core/core.module';
import {CashierService} from './home/shared/cashier.service';
import {ArticleService} from './home/shared/article.service';
import {CashierClosureService} from './home/cashier-opened/cashier/cashier-closure.service';
import {CashMovementService} from './home/cashier-opened/shared/cash-movement/cash-movement.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {AdminsService} from './home/admins/admins.service';
import {UserService} from './home/users/user.service';
import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsService} from './home/shared/statistics.service';
import {ProviderService} from './home/providers/provider.service';
import {OfferService} from './home/offers/offer.service';
import {OrderService} from './home/order/order.service';
import {ArticleFamilyService} from './home/articles-families/articles-families.service';
import {VoucherService} from './home/vouchers/voucher.service';

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
    NgxChartsModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOGS
  ],
  entryComponents: [AppRoutingModule.DIALOGS],
  providers: [
    AdminsService,
    ArticleFamilyService,
    ArticleService,
    CashierClosureService,
    CashierService,
    CashMovementService,
    ShoppingCartService,
    StatisticsService,
    UserService,
    ProviderService,
    UserService,
    OfferService,
    OrderService,
    VoucherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
