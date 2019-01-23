import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CoreModule} from './core/core.module';
import {UserService} from './home/shared/user.service';
import {CashierService} from './home/shared/cashier.service';
import {AdminsService} from './home/admins/admins.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {ArticleService} from './home/shared/article.service';
import {TicketService} from './home/shared/ticket.service';
import {CashierClosureService} from './home/cashier-opened/cashier-closure/cashier-closure.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOG_COMPONENT
  ],
  entryComponents: [AppRoutingModule.DIALOG_COMPONENT],
  providers: [
    AdminsService,
    ArticleService,
    CashierClosureService,
    CashierService,
    ShoppingCartService,
    TicketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
