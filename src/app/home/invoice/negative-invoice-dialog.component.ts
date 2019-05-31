import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatFormFieldControl} from '@angular/material';
import {InvoiceUpdateService} from './invoice-update.service';
import {InvoiceUpdateModel} from '../shared/invoice-update.model';

@Component({
  templateUrl: 'negative-invoice-dialog.component.html',
  styleUrls: ['./negative-invoice-dialog.component.css'],
})
export class NegativeInvoiceDialogComponent  {
  @Input() message: string;
  @Input() positiveValue: number;
  @Input() totalTax: number;
  @Output() newTax: number;
  id: string;
  data: InvoiceUpdateModel;
  creationDate: string;
  baseTax: string;
  vatTax: string;
  tax: string;
  maxVATTax: number;
  negativeValue: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private invoiceUpdateService: InvoiceUpdateService) {
    this.message = data.message;
    this.id = data.invoice.id;
    this.baseTax = data.invoice.baseTax;
    this.vatTax = data.invoice.tax;
    this.totalTax = Number(this.baseTax) + Number(this.vatTax);
    this.maxVATTax = data.invoice.tax;
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


  generateNegativeInvoice() {
    const negativeInvoice: InvoiceUpdateModel = this.data;
    negativeInvoice.referencesPositiveInvoice = this.id;
    negativeInvoice.tax = this.newTax;
    negativeInvoice.negative = this.negativeValue;
    if (this.positiveValue > 0) {
      this.invoiceUpdateService.generateNegative(negativeInvoice).subscribe();
    }
  }
  setPosibleTotal() {
    this.negativeValue = this.positiveValue;
  }
}
