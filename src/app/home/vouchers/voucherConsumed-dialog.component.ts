import {Component, OnInit} from '@angular/core';
import {Voucher} from './voucher.model';

@Component({
  templateUrl: 'voucherConsumed-dialog.component.html',
  styleUrls: ['vouchersUse.component.css']
})
export class VoucherConsumedDialogComponent implements OnInit {
  voucher: Voucher;

  constructor() {

  }

  ngOnInit() {
  }

  consumed() {
  }
}
