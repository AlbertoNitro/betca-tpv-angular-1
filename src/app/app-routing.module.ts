import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdvancedSearchComponent} from './home/cashier-opened/advanced-search/advanced-search.component';
import {FamilySizesCreationComponent} from './home/cashier-opened/articles-family/family-sizes-creation.component';
import {ArticlesFamilyViewComponent} from './home/cashier-opened/articles-family/articles-family-view.component';
import {CashierClosedComponent} from './home/cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './home/cashier-opened/cashier-opened.component';
import {CashMovementDialogComponent} from './home/cashier-opened/shared/cash-movement/cash-movement-dialog.component';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './home/cashier-opened/shopping-cart/shopping-cart.component';
import {UsersComponent} from './home/users/users.component';
import {ArticleQuickCreationDialogComponent} from './home/cashier-opened/shopping-cart/article-quick-creation-dialog.component';
import {CashierClosureDialogComponent} from './home/cashier-opened/cashier/cashier-closure-dialog.component';
import {CheckOutDialogComponent} from './home/cashier-opened/shopping-cart/check-out-dialog.component';
import {DbSeedDialogComponent} from './home/admins/db-seed-dialog.component';
import {WelcomeComponent} from './welcome.component';
import {LineChartComponent} from './core/line-chart.component';
import {ProvidersComponent} from './home/providers/providers.component';
import {ProfileDialogComponent} from './home/users/profile-dialog.component';
import {ArticlesFamiliesCRUDComponent} from './home/articles-families/articles-families.component';
import {OffersComponent} from './home/offers/offers.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: ArticlesFamiliesCRUDComponent.URL, component: ArticlesFamiliesCRUDComponent},
      {path: CashierClosedComponent.URL, component: CashierClosedComponent},
      {path: CashierOpenedComponent.URL, component: CashierOpenedComponent},
      {path: ProvidersComponent.URL, component: ProvidersComponent},
      {path: OffersComponent.URL, component: OffersComponent},
      {path: UsersComponent.URL, component: UsersComponent}
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
    ArticlesFamiliesCRUDComponent,
    ArticlesFamilyViewComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    LineChartComponent,
    ProvidersComponent,
    ShoppingCartComponent,
    UsersComponent,
    WelcomeComponent,
    OffersComponent
  ];

  static DIALOGS = [
    FamilySizesCreationComponent,
    ArticleQuickCreationDialogComponent,
    CashierClosureDialogComponent,
    CashMovementDialogComponent,
    CheckOutDialogComponent,
    DbSeedDialogComponent,
    ProfileDialogComponent
  ];
}
