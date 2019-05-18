import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ArticleDetailModel } from '../shared/article-detail-model';
import { InvoiceUpdateModel } from '../shared/invoice-update.model';
import {InvoiceUpdateService} from './invoice-update.service';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  static URL = 'invoice_update';
  invoiceUpdateForm: FormGroup;
  myDate: Date;
  myDateTo: Date;
  mobile: string;
  data: InvoiceUpdateModel[];
  articleList: ArticleDetailModel[];
  title = 'Invoice Update';
  columns = ['id', 'creationDate', 'baseTax', 'tax'];
  constructor(private formBuilder: FormBuilder , private invoiceUpdateService: InvoiceUpdateService) {
  }

  ngOnInit() {
    this.invoiceUpdateForm = this.formBuilder.group({
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        dateFrom: ['', ],
        dateTo: ['', ],
      }
    );
  }
  searchMobile() {
    let dateFrom = '';
    let dateTo = '';
    if (this.myDate !== undefined) {
      const dd = this.myDate.getDate();
      const mm = this.myDate.getMonth() + 1;
      const yy = this.myDate.getFullYear();
      dateFrom = yy.toString() + (mm < 10 ? '0' + mm.toString() : mm.toString()) + (dd < 10 ? '0' + dd.toString() : dd.toString());
      const ddTo = this.myDateTo.getDate();
      const mmTo = this.myDateTo.getMonth() + 1;
      const yyTo = this.myDateTo.getFullYear();
      dateTo = yyTo.toString() + (mmTo < 10 ? '0' + mmTo.toString() : mmTo.toString()) + (ddTo < 10 ? '0' +
        ddTo.toString() : ddTo.toString());
    }
    console.log('Mobile: ' + this.mobile + 'DateFrom ' + dateFrom + 'DateTo ' + dateTo);
    this.invoiceUpdateService.getInvoices(this.mobile, dateFrom, dateTo).subscribe(
      list =>  {
        this.data = list;
        console.log(list);
      }
    );
  }
  resetMobile() {
    this.invoiceUpdateForm.reset();
  }
}
