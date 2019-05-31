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
  creationDate: string;
  baseTax: string;
  tax: string;
  negativeValue: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private invoiceUpdateService: InvoiceUpdateService) {
    this.message = data.message;
    this.id = data.id;
    this.invoiceUpdateService.look4PosibleTotal(this.id).subscribe(
      posibletotal =>
        this.positiveValue = posibletotal
    );
  }
  generateNegativeInvoice(event: Event) {
    const negativeInvoice: InvoiceUpdateModel = null;
    console.log(event.target);
    /*
    negativeInvoice.referencesPositiveInvoice = invoiceUpdateModel.id;
    this.invoiceUpdateService.generateNegative(negativeInvoice);
  */
  }
  setPosibleTotal(id: any) {
    this.negativeValue = this.positiveValue;
  }
}
