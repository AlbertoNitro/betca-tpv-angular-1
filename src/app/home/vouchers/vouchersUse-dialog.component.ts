import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {VoucherService} from '../shared/voucher.service';

@Component({
  selector: 'app-voucher-dialog',
  templateUrl: './vouchersUse-dialog.component.html',
  styleUrls: ['./vouchersUse.component.css']
})
export class VouchersUseDialogComponent implements OnInit {
  codeVoucher: string;
  importeVoucher: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private voucherService: VoucherService) {
  }

  ngOnInit() {
  }

  save() {
    this.importeVoucher = 0;
    this.voucherService.readById(this.codeVoucher).subscribe(
      data => {
        this.showMessage('Voucher used' + data.value);

        this.importeVoucher = data.value;
      },
      error => {
        return Observable.throw(error);
        this.showMessage('Error in se voucher.');
      }
    );
    return this.importeVoucher;
  }

  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }
}
