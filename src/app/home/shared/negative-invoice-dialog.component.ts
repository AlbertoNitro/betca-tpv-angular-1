import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatFormFieldControl} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

@Component({
  templateUrl: 'negative-invoice-dialog.component.html',
  styleUrls: ['./negative-invoice-dialog.component.css'],
})
export class NegativeInvoiceDialogComponent  {

  @Input() message: string;
  @Input() positiveValue: number;
  @Input() totalTax: number;
  negativeValue: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
  }
  generateNegativeInvoice() {
    console.log(this.negativeValue);
  }
  look4PosibleTotal() {

  }
}
