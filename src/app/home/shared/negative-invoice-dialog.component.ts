import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatFormFieldControl} from '@angular/material';
import {InvoiceUpdateService} from '../invoice/invoice-update.service';
import {InvoiceUpdateModel} from './invoice-update.model';

@Component({
  templateUrl: 'negative-invoice-dialog.component.html',
  styleUrls: ['./negative-invoice-dialog.component.css'],
})
export class NegativeInvoiceDialogComponent  {

  @Input() message: string;
  @Input() positiveValue: number;
  @Input() totalTax: number;
  id: string;
  data: InvoiceUpdateModel;
  creationDate: string;
  baseTax: string;
  tax: string;
  negativeValue: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private invoiceUpdateService: InvoiceUpdateService) {
    this.message = data.message;
    this.id = data.invoice.id;
    this.data = data.invoice;
    this.invoiceUpdateService.look4PosibleTotal(this.id).subscribe(
      posibletotal =>
        this.positiveValue = posibletotal
    );
  }
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
