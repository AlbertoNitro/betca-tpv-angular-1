import {Component, Inject, OnInit} from '@angular/core';
import {Voucher} from './voucher.model';
import {VoucherService} from '../shared/voucher.service';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  templateUrl: 'voucherConsumed-dialog.component.html',
  styleUrls: ['vouchersUse.component.css']
})
export class VoucherConsumedDialogComponent implements OnInit {
  voucher: Voucher;
  myFlagForSlideToggle: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private voucherService: VoucherService) {
    this.voucher = data.voucher;
    this.myFlagForSlideToggle = this.voucher.dateOfUse != null;
  }

  ngOnInit() {
  }

  consumed() {
    console.log(this.voucher);
    this.voucherService.update(this.voucher.id).subscribe(
      data => {
        this.voucherService.readAll();
        this.showMessage('Consumed Voucher');
        return true;
      },
      error => {
        this.showMessage('Error when searching data.');
        console.log(error);
      }
    );
  }

  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }
}
