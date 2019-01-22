import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {CashierClosing} from '../shared/cashier-closing.model';
import {CashierClosure} from '../shared/cashier-closure.model';
import {CashierService} from '../shared/cashier.service';

@Component({
  templateUrl: 'cashier-close-dialog.component.html',
  styleUrls: ['cashier-opened.component.css']
})
export class CashierCloseDialogComponent {
  cashierClosure: CashierClosure = {finalCash: undefined, salesCard: undefined, comment: undefined};
  cashierClosing: CashierClosing = {totalVoucher: undefined};

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashierCloseDialogComponent>,
              private cashierService: CashierService) {

    this.synchronizeTotal();
  }

  close() {
    this.cashierService.close(this.cashierClosure).subscribe(
      () => this.dialogRef.close()
    );
  }

  invalid() {
    return (!this.cashierClosure.finalCash && this.cashierClosure.finalCash !== 0)
      || (!this.cashierClosure.salesCard && this.cashierClosure.salesCard !== 0)
      || !this.cashierClosure.comment;
  }

  cashMovement() {
  }

  private synchronizeTotal() {
    this.cashierService.readLastTotals().subscribe(
      cashierClosing => this.cashierClosing = cashierClosing
    );
  }
}
