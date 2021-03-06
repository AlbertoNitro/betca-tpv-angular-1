import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvancedSearchComponent} from './home/cashier-opened/advanced-search/advanced-search.component';
import {AlarmComponent} from './home/alarms/alarm.component';
import {ArticlesComponent} from './home/articles/articles.component';
import {FamilySizesCreationComponent} from './home/cashier-opened/articles-family/family-sizes-creation.component';
import {ArticlesFamilyViewComponent} from './home/cashier-opened/articles-family/articles-family-view.component';
import {BudgetsComponent} from './home/budgets/budgets.component';
import {CashierClosedComponent} from './home/cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './home/cashier-opened/cashier-opened.component';
import {CashMovementDialogComponent} from './home/cashier-opened/shared/cash-movement/cash-movement-dialog.component';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './home/cashier-opened/shopping-cart/shopping-cart.component';
import {UsersComponent} from './home/users/users.component';
import {AlarmCreateUpdateDialogComponent} from './home/alarms/alarm-create-update-dialog/alarm-create-update-dialog.component';
import {ArticleCreateUpdateDialogComponent} from './home/articles/article-create-update-dialog/article-create-update-dialog.component';
import {ArticleQuickCreationDialogComponent} from './home/cashier-opened/shopping-cart/article-quick-creation-dialog.component';
import {CashierClosureDialogComponent} from './home/cashier-opened/cashier/cashier-closure-dialog.component';
import {CheckOutDialogComponent} from './home/cashier-opened/shopping-cart/check-out-dialog.component';
import {DbSeedDialogComponent} from './home/admins/db-seed-dialog.component';
import {WelcomeComponent} from './welcome.component';
import {LineChartComponent} from './core/line-chart.component';
import {ProvidersComponent} from './home/providers/providers.component';
import {ProviderSelectComponent} from './home/providers/provider-select.component';
import {ProvidersSaveDialogComponent} from './home/providers/providers-save-dialog.component';
import {ProfileDialogComponent} from './home/users/profile-dialog.component';
import {ArticlesFamiliesCRUDComponent} from './home/articles-families/articles-families.component';
import {OffersComponent} from './home/offers/offers.component';
import {OffersCreateDialogComponent} from './home/offers/offers-create-dialog.component';
import {OffersDetailsDialogComponent} from './home/offers/offers-details-dialog.component';
import {OperatorManagerComponent} from './home/operator-manager/operator-manager.component';
import {StatisticComponent} from './home/stadistics/statistic.component';
import {StockPredictionComponent} from './home/stock-prediction/stock-prediction.component';
import {RolesDialogComponent} from './home/users/roles-dialog.component';
import {InvoiceUpdateComponent} from './home/invoice/invoice-update.component';
import {AlarmsQueryComponent} from './home/alarms/alarms-query-component/alarms-query-component';
import {ArticlesQueryComponent} from './home/shared/articles-query.component';
import {VouchersUseDialogComponent} from './home/vouchers/vouchersUse-dialog.component';
import {TicketsComponent} from './home/tickets/tickets.component';
import {OrderComponent} from './home/order/order.component';
import {UserCreateUpdateDialogComponent} from './home/users/user-create-update-dialog/user-create-update-dialog.component';
import {UserQuickCreationDialogComponent} from './home/cashier-opened/shopping-cart/user-quick-creation-dialog/user-quick-creation-dialog.controller';
import {RGPDComponent} from './home/rgpd/rgpd.component';
import {ArticlesFamiliesCreateDialogComponent} from './home/articles-families/create-dialog/articles-families-create-dialog.component';
import {VouchersComponent} from './home/vouchers/vouchers.component';
import {VoucherNewDialogComponent} from './home/vouchers/voucherNew-dialog.component';
import {VoucherConsumedDialogComponent} from './home/vouchers/voucherConsumed-dialog.component';
import {ArticlesFamiliesUpdateDialogComponent} from './home/articles-families/update-dialog/articles-families-update-dialog.component';
import {ArticlesFamiliesAttachDialogComponent} from './home/articles-families/update-dialog/attach-dialog/articles-families-attach-dialog.component';
import {ArticlesFamilyViewSizesDialogComponent} from './home/cashier-opened/articles-family/articles-family-view-dialog/articles-family-view-sizes-dialog.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: AlarmComponent.URL, component: AlarmComponent},
      {path: ArticlesComponent.URL, component: ArticlesComponent},
      {path: ArticlesFamiliesCRUDComponent.URL, component: ArticlesFamiliesCRUDComponent},
      {path: BudgetsComponent.URL, component: BudgetsComponent},
      {path: CashierClosedComponent.URL, component: CashierClosedComponent},
      {path: CashierOpenedComponent.URL, component: CashierOpenedComponent},
      {path: OperatorManagerComponent.URL, component: OperatorManagerComponent},
      {path: ProvidersComponent.URL, component: ProvidersComponent},
      {path: StatisticComponent.URL, component: StatisticComponent},
      {path: StockPredictionComponent.URL, component: StockPredictionComponent},
      {path: OffersComponent.URL, component: OffersComponent},
      {path: TicketsComponent.URL, component: TicketsComponent},
      {path: UsersComponent.URL, component: UsersComponent},
      {path: OrderComponent.URL, component: OrderComponent},
      {path: RGPDComponent.URL, component: RGPDComponent},
      {path: VouchersComponent.URL, component: VouchersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static COMPONENTS = [
    AdvancedSearchComponent,
    AlarmComponent,
    AlarmsQueryComponent,
    ArticlesComponent,
    ArticlesFamiliesCRUDComponent,
    ArticlesFamilyViewComponent,
    ArticlesQueryComponent,
    BudgetsComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    InvoiceUpdateComponent,
    LineChartComponent,
    OffersComponent,
    OperatorManagerComponent,
    ProvidersComponent,
    ProviderSelectComponent,
    ShoppingCartComponent,
    StatisticComponent,
    StockPredictionComponent,
    TicketsComponent,
    OrderComponent,
    UsersComponent,
    WelcomeComponent,
    RGPDComponent,
    VouchersComponent
  ];

  static DIALOGS = [
    AlarmCreateUpdateDialogComponent,
    ArticleCreateUpdateDialogComponent,
    FamilySizesCreationComponent,
    ArticlesFamiliesAttachDialogComponent,
    ArticlesFamiliesCreateDialogComponent,
    ArticlesFamiliesUpdateDialogComponent,
    ArticleQuickCreationDialogComponent,
    ArticlesFamilyViewSizesDialogComponent,
    CashierClosureDialogComponent,
    CashMovementDialogComponent,
    CheckOutDialogComponent,
    DbSeedDialogComponent,
    OffersCreateDialogComponent,
    OffersDetailsDialogComponent,
    ProfileDialogComponent,
    ProvidersSaveDialogComponent,
    RolesDialogComponent,
    UserCreateUpdateDialogComponent,
    UserQuickCreationDialogComponent,
    VouchersUseDialogComponent,
    VoucherNewDialogComponent,
    VoucherConsumedDialogComponent
  ];
}
