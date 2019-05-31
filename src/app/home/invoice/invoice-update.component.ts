import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InvoiceUpdateModel } from '../shared/invoice-update.model';
import {InvoiceUpdateService} from './invoice-update.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SimpleDialogComponent} from '../shared/simple-dialog.component';
import {NegativeInvoiceDialogComponent} from '../shared/negative-invoice-dialog.component';

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
  }
  search() {
    let dateFrom = '';
    let dateTo = '';
    if (this.myDate !== undefined && this.myDate !== null) {
      const dd = this.myDate.getDate();
      const mm = this.myDate.getMonth() + 1;
      const yy = this.myDate.getFullYear();
      dateFrom = yy.toString() + (mm < 10 ? '0' + mm.toString() : mm.toString()) + (dd < 10 ? '0' + dd.toString() : dd.toString());
      if (this.myDateTo !== undefined) {
        const ddTo = this.myDateTo.getDate();
        const mmTo = this.myDateTo.getMonth() + 1;
        const yyTo = this.myDateTo.getFullYear();
        dateTo = yyTo.toString() + (mmTo < 10 ? '0' + mmTo.toString() : mmTo.toString()) + (ddTo < 10 ? '0' +
          ddTo.toString() : ddTo.toString());
      }
    }
    // console.log('Mobile: ' + this.mobile + 'DateFrom ' + dateFrom + 'DateTo ' + dateTo);
    if (this.mobile !== '' && dateFrom === '' && dateTo === '') {
      this.invoiceUpdateService.getInvoicesByMobile(this.mobile).subscribe(
        list => {
          this.data = list;
        }
      );
    } else if (this.mobile === '' && dateFrom !== '' && dateTo === '') {
      this.invoiceUpdateService.getInvoicesByAfterDate(dateFrom).subscribe(
        list => {
          this.data = list;
        }
      );
    } else if (this.mobile === '' && dateTo !== '' && dateFrom !== '') {
      this.invoiceUpdateService.getInvoicesByBetweenDates(dateFrom, dateTo).subscribe(
        list => {
          this.data = list;
        }
      );
    } else {
      this.invoiceUpdateService.getInvoicesByMobileAndBetweenDate(this.mobile, dateFrom, dateTo).subscribe(
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
  @HostListener('update', ['$event'])
  update(id: string) {
    this.dialogConfig = {
      data: {
        message: 'The invoice cannot be deleted because it has already been issued.',
        id: id
      }
    };
    /*
    if (this.el.nativeElement.contains(event.target)) {
    } else {
    }

        id: event.target.classList.contains('id'),
        creationDate: event.target.classList.contains('creationDate'),
        baseTax: event.target.classList.contains('baseTax'),
        tax: event.target.classList.contains('tax')
      }
    };
    console.log('id: ' + this.dialogConfig.data.id + ' creationDate: ' + this.dialogConfig.data.creationDate);
    */
     this.dialog.open(NegativeInvoiceDialogComponent, this.dialogConfig);
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
