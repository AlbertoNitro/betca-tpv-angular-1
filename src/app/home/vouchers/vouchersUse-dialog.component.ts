import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {VoucherService} from '../shared/voucher.service';

@Component({
  selector: 'app-voucher-dialog',
  templateUrl: './vouchersUse-dialog.component.html',
  styleUrls: ['./vouchersUse.component.css']
})
export class VouchersUseDialogComponent implements OnInit {
  codeVoucher: string;

  constructor(public dialogRef: MatDialogRef<VouchersUseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar, private voucherService: VoucherService) {
    data.id = this.codeVoucher;
  }

  ngOnInit() {
  }

  save() {
    this.voucherService.readById(this.codeVoucher).subscribe(
      resul => {
        this.data = resul;
        this.dialogRef.close(this.data);
      },
      error => {
        this.showMessage('Code voucher not valid.');
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
