import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {CashierClosedComponent} from './home/cashier-closed/cashier-closed.component';
import {AdvancedSearchComponent} from './home/cashier-opened/advanced-search/advanced-search.component';
import {ArticlesFamilyViewComponent} from './home/cashier-opened/articles-family/articles-family-view.component';
import {ShoppingCartComponent} from './home/cashier-opened/shopping-cart/shopping-cart.component';
import {CashierOpenedComponent} from './home/cashier-opened/cashier-opened.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: CashierClosedComponent.URL, component: CashierClosedComponent},
      {path: CashierOpenedComponent.URL, component: CashierOpenedComponent}
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
    ArticlesFamilyViewComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    ShoppingCartComponent,
    WelcomeComponent,
  ];

  static DIALOG_COMPONENT = [];
}
