import {Component} from '@angular/core';
import {InvoiceService} from "./invoice.service";


@Component({
  templateUrl: 'generate-invoice-dialog.component.html',
  styleUrls: ['generate-invoice-dialog.component.css']
})
export class GenerateInvoiceDialogComponent {

  ticketReference: string;

  constructor(private invoiceService: InvoiceService) {
  }

  generateInvoice() {
    this.invoiceService.generateInvoice(this.ticketReference).subscribe(() => {
    })
  }
}
