import {Component} from '@angular/core';

import {VoucherService} from './voucher.service';
import {MatDialog} from '@angular/material';


@Component({
  templateUrl: `vouchers.component.html`,

  styleUrls: ['./vouchers.component.css']
})

export class VouchersComponent {
  static URL = 'vouchers';


  constructor(private voucherService: VoucherService, private dialog: MatDialog) {
  }


}
