import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {CashierClosureService} from './cashier-closure.service';
import {CashierStatus} from './cashier-status.model';
import {CashierClosure} from './cashier-closure.model';


@Component({
  templateUrl: 'cashier-closure-dialog.component.html',
  styleUrls: ['cashier-closure-dialog.component.css']
})
export class CashierClosureDialogComponent {
  cashierClosure: CashierClosure = {finalCash: undefined, finalCard: undefined, comment: undefined};
  cashierClosureData: CashierStatus =
    {salesTotal: undefined, totalCard: undefined, totalCash: undefined, totalVoucher: undefined};

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashierClosureDialogComponent>,
              private cashierClosureService: CashierClosureService) {
    this.cashierClosureService.readLastTotals().subscribe(
      cashierClosureData => this.cashierClosureData = cashierClosureData
    );
  }

  close() {
    this.cashierClosureService.close(this.cashierClosure).subscribe(
      () => this.dialogRef.close()
    );
  }

  invalid() {
    return (!this.cashierClosure.finalCash && this.cashierClosure.finalCash !== 0)
      || (!this.cashierClosure.finalCard && this.cashierClosure.finalCard !== 0)
      || !this.cashierClosure.comment;
  }

  cashMovement() {
    // TODO ...
    console.log('In construction!!!');
  }

}
