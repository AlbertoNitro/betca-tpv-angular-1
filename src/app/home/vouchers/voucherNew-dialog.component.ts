import {Component, Inject, OnInit} from '@angular/core';
import {VoucherService} from '../shared/voucher.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Provider} from '../providers/provider.model';
import {Voucher} from './voucher.model';
import {VoucherMin} from '../shared/voucher-min.model';

@Component({
  templateUrl: 'voucherNew-dialog.component.html',
  styleUrls: ['vouchersUse.component.css']
})
export class VoucherNewDialogComponent implements OnInit {
  mode: string;
  provider: Provider = {};
  data: string;
  voucher: VoucherMin;
  valueVoucher: number;
  constructor(private dialogRef: MatDialogRef<Voucher>, @Inject(MAT_DIALOG_DATA) data: any, private voucherservice: VoucherService) {
    this.mode = data.mode;
    if (this.mode === 'create') {
      this.provider = data.provider;
    }
  }

  ngOnInit() {
  }

  create() {
    this.voucher = {
      value: this.valueVoucher
    };
    this.voucherservice.create(this.voucher).subscribe();
  }
}

