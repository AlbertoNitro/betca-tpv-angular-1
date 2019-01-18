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
    CashierService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
