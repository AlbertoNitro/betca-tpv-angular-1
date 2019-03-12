import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-voucher-dialog',
  templateUrl: './vouchersUse-dialog.component.html',
  styleUrls: ['./vouchersUse.component.css']
})
export class VouchersUseDialogComponent implements OnInit {
  codeVoucher: string;

  constructor() {
  }

  ngOnInit() {
  }

  save() {

    console.log(this.codeVoucher);
  }

}
