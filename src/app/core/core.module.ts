import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import {HttpService} from './http.service';
import {TokensService} from './tokens.service';

import {DateComponent} from './date.component';
import {LoginDialogComponent} from './login-dialog.component';
import {CancelYesDialogComponent} from './cancel-yes-dialog.component';
import {CrudComponent} from './crud.component';
import {DetailsDialogComponent} from './details-dialog.component';
import {DataTableComponent} from './data-table.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    DataTableComponent,
    DetailsDialogComponent,
    DateComponent,
    LoginDialogComponent
  ],
  exports: [
    CancelYesDialogComponent,
    CrudComponent,
    DataTableComponent,
    DetailsDialogComponent,
    DateComponent,
    LoginDialogComponent,

  ],
  entryComponents: [
    CancelYesDialogComponent,
    DetailsDialogComponent,
    LoginDialogComponent
  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
