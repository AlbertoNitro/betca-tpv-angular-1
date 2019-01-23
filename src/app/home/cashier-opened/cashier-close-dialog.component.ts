import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {CashierService} from '../shared/cashier.service';
import {CashierClosing} from '../shared/cashier-closing.model';
import {CashierClosure} from '../shared/cashier-closure.model';

@Component({
  templateUrl: 'cashier-close-dialog.component.html',
  styleUrls: ['cashier-opened.component.css']
})
export class CashierCloseDialogComponent {
  cashierClosure: CashierClosure = {finalCash: undefined, salesCard: undefined, comment: undefined};
  cashierClosing: CashierClosing;

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
    this.synchronizeTotal();
  }

  private synchronizeTotal() {
    this.cashierService.readLastTotals().subscribe(
      cashierClosing => this.cashierClosing = cashierClosing
    );
  }
}
