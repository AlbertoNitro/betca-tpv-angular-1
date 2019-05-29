import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@Component({
  templateUrl: 'negative-invoice-dialog.component.html',
  styleUrls: ['./negative-invoice-dialog.component.css']
})
export class NegativeInvoiceDialogComponent {

  message: string;
  positiveValue: number;
  totalTax: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
  }
  generateNegativeInvoice() {

  }
  look4PosibleTotal() {

  }
}
