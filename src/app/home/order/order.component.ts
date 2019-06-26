import {Component} from '@angular/core';

import {Order} from './order.model';
import {OrderService} from './order.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DetailsDialogComponent} from '../../core/details-dialog.component';
import {OrderSaveDialogComponent} from './order-save-dialog.component';
import {ModalComponent} from './modal/modal.component';
import {ProviderService} from '../providers/provider.service';
import {Provider} from '../providers/provider.model';
import {Article} from '../shared/article.model';
import {OrderArticle} from './order-article.model';
import {$} from 'protractor';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  static URL = 'orders';

  orderSearch: { descriptionOrders: string; descriptionArticles: string; onlyClosingDate: boolean };
  order: { descriptionOrders: string; descriptionArticles: string; onlyClosingDate: boolean };
  data: Order[];
  title = 'Order management';
  columns = ['descriptionOrders', 'openingDate', 'closingDate'];
  provider: { 'active': true };
  providers: Provider[];
  dataDialog: Article[];
  columnsDialog = ['code', 'description', 'retailPrice'];
  titleDialog = 'Card articles';
  dataDialogArticle: OrderArticle[];

  constructor(private orderService: OrderService, private  dialog: MatDialog, private providerService: ProviderService,
              public snackBar: MatSnackBar) {
    this.order = {descriptionOrders: '', descriptionArticles: '', onlyClosingDate: false};
    this.data = null;
    this.orderSearch = {descriptionOrders: '', descriptionArticles: '', onlyClosingDate: false};
  }

  readAll() {
    this.orderService.readAll().subscribe(
      data => this.data = data
    );
  }

  public search() {
    this.orderService.readSearch(this.orderSearch).subscribe(
      data => {
        this.data = data;
      }
    );
  }

  resetSearch() {
    this.orderSearch = {descriptionOrders: '', descriptionArticles: '', onlyClosingDate: false};
  }

  create() {
    this.dialog.open(OrderSaveDialogComponent,
      {
        data: {
          mode: 'create',
          title: this.titleDialog,
          columns: this.columnsDialog,
          datos: this.dataDialog,
        },
        width: '1000px'
      }
    );
  }

  read(id: string) {
    this.orderService.read(id).subscribe(
      data =>
        this.dialog.open(DetailsDialogComponent,
          {
            data: {
              title: 'Provider details',
              object: data,
              properties: Object.getOwnPropertyNames(data),
            }
          }
        )
    );
  }

  update(order: Order) {
    console.log(order);
    this.orderService.finById(order).subscribe(
      result => {
        this.dataDialogArticle = result;
        this.dialog.open(OrderSaveDialogComponent,
          {
            data: {
              mode: 'update',
              title: this.titleDialog,
              columns: this.columnsDialog,
              datos: this.dataDialogArticle,
              orderSelect: order
            },
            width: '1000px'
          }
        );
      }
    );
  }

  closeOrderModal(order: Order): void {
    const getOrder = this.orderService.finOrderById(order).subscribe(
      result => {
        if(result['closingDate']) {
          this.snackBar.open('Order Closed', 'Close', {
            duration: 3000
          });
          return;
        }
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '1000px',
          data: result
        });
      }
    );
  }
}
