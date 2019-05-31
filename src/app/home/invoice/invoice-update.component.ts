import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InvoiceUpdateModel } from '../shared/invoice-update.model';
import {InvoiceUpdateService} from './invoice-update.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SimpleDialogComponent} from '../shared/simple-dialog.component';
import {NegativeInvoiceDialogComponent} from './negative-invoice-dialog.component';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  static URL = 'invoice_update';
  invoiceUpdateForm: FormGroup;
  selectDateFrom: Date;
  selectDateFromString: string;
  selectDateTo: Date;
  selectDateToString: string;
  mobile: string;
  data: InvoiceUpdateModel[];
  title = 'Invoice Update';
  columns = ['id', 'creationDate', 'baseTax', 'tax'];
  dialogConfig: MatDialogConfig;
  constructor(private formBuilder: FormBuilder , private invoiceUpdateService: InvoiceUpdateService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.invoiceUpdateForm = this.formBuilder.group({
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        dateFrom: ['', ],
        dateTo: ['', ],
      }
    );
 //   this.mobile = '';
    this.selectDateFromString = '';
    this.selectDateToString = '';
  }
  search() {

    if (this.selectDateFrom !== undefined && this.selectDateFrom !== null) {
      const dd = this.selectDateFrom.getDate();
      const mm = this.selectDateFrom.getMonth() + 1;
      const yy = this.selectDateFrom.getFullYear();
      this.selectDateFromString = yy.toString() + (mm < 10 ? '0' + mm.toString() : mm.toString())
        + (dd < 10 ? '0' + dd.toString() : dd.toString());
    }
    if (this.selectDateTo !== undefined && this.selectDateTo !== null) {
        const ddTo = this.selectDateTo.getDate();
        const mmTo = this.selectDateTo.getMonth() + 1;
        const yyTo = this.selectDateTo.getFullYear();
        this.selectDateToString = yyTo.toString() + (mmTo < 10 ? '0' + mmTo.toString() : mmTo.toString())
          + (ddTo < 10 ? '0' + ddTo.toString() : ddTo.toString());
    }
    console.log('Mobile: ' + this.mobile + 'DateFrom ' + this.selectDateFromString + 'DateTo ' + this.selectDateToString);
    if (this.mobile !== '' && this.mobile !== null
        && this.selectDateFromString === '' && this.selectDateToString === '') {
      this.invoiceUpdateService.getInvoicesByMobile(this.mobile).subscribe(
        list => {
          this.data = list;
        }
      );
    } else if (this.mobile === null || this.mobile === ''
              && this.selectDateFrom !== null
              || this.selectDateFromString !== ''
              && this.selectDateTo === null
              || this.selectDateToString === '') {
      this.invoiceUpdateService.getInvoicesByAfterDate(this.selectDateFromString).subscribe(
        list => {
          this.data = list;
        }
      );
    } else if (this.mobile === null || this.mobile === ''
              && this.selectDateTo !== null
              || this.selectDateToString !== ''
              && this.selectDateFrom !== null
              || this.selectDateFromString !== '') {
      this.invoiceUpdateService.getInvoicesByBetweenDates(this.selectDateFromString, this.selectDateToString).subscribe(
        list => {
          this.data = list;
        }
      );
    } else {
      this.invoiceUpdateService.getInvoicesByMobileAndBetweenDate(this.mobile,
            this.selectDateFromString, this.selectDateToString).subscribe(
        list => {
          this.data = list;
        }
      );
    }


  }
  resetMobile() {
    this.invoiceUpdateForm.reset();
  }
  generatePdf(id: any) {
    this.invoiceUpdateService.generatePdf(id).subscribe();
  }

  update(id: any) {
    this.dialogConfig = {
      data: {
        message: 'The invoice cannot be deleted because it has already been issued.',
        invoice: this.data.find(x => x.id === id)
      }
    };
    this.dialog.open(NegativeInvoiceDialogComponent, this.dialogConfig).afterClosed();
  }
  deleteInfo() {
    this.dialogConfig = {
      data: {
        message: 'The invoice cannot be deleted because it has already been issued.',
        question: ''
      }
    };
    this.dialog.open(SimpleDialogComponent, this.dialogConfig);
  }
}
