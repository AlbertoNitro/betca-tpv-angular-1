import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatFormFieldControl} from '@angular/material';
import {InvoiceUpdateService} from '../invoice/invoice-update.service';
import {InvoiceUpdateModel} from './invoice-update.model';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';

@Component({
  templateUrl: 'negative-invoice-dialog.component.html',
  styleUrls: ['./negative-invoice-dialog.component.css'],
})
export class NegativeInvoiceDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private invoiceUpdateService: InvoiceUpdateService) {
    this.message = data.message;
    this.id = data.invoice.id;
    this.data = data.invoice;
    this.positiveValue = 0;
    this.invoiceUpdateService.look4PosibleTotal(this.id).subscribe(
      posibletotal => {
        if (posibletotal >= 0) {
          this.positiveValue = posibletotal;
        } else {this.positiveValue = 0; }
      }
      );
  }

  @Input() message: string;
  @Input() positiveValue: number;
  @Input() totalTax: number;
  id: string;
  data: InvoiceUpdateModel;
  creationDate: string;
  baseTax: string;
  tax: string;
  negativeValue: number;
  generateNegativeInvoice() {
    const negativeInvoice: InvoiceUpdateModel = this.data;
    negativeInvoice.referencesPositiveInvoice = this.id;
    negativeInvoice.negative = this.negativeValue;
    this.invoiceUpdateService.generateNegative(negativeInvoice).subscribe();
  }
  setPosibleTotal(id: any) {
    this.negativeValue = this.positiveValue;
  }
}
