import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ArticleDetailModel } from '../shared/article-detail-model';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  static URL = 'invoice_update';
  invoiceUpdateForm: FormGroup;
  myDate: Date;
  myDateTo: Date;
  articleList: ArticleDetailModel[];
  title = 'Invoice Update';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  constructor(private formBuilder: FormBuilder) {
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
    console.log('search mobile');
  }
  resetMobile() {
    console.log('reset mobile');
  }
}
