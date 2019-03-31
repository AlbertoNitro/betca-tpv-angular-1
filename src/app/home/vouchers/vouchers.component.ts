import {Component, OnInit} from '@angular/core';
import {VoucherService} from '../shared/voucher.service';
import {Voucher} from './voucher.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {VoucherNewDialogComponent} from './voucherNew-dialog.component';
import {VoucherConsumedDialogComponent} from './voucherConsumed-dialog.component';

import {Moment} from 'moment';


@Component({
  selector: 'app-vouchers',
  templateUrl: `vouchers.component.html`,
  styleUrls: ['./vouchers.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class VouchersComponent implements OnInit {
  static URL = 'vouchers';
  voucher: Voucher;
  isChecked: boolean;
  form: FormGroup;
  endDate: Date;
  title = 'Vouchers management';
  columns = ['id', 'value'];
  data: Voucher[];
  dateFrom: Moment;
  dateTo: Moment;

  constructor(fb: FormBuilder, private voucherService: VoucherService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      initDate: new FormControl(),
      endDate: new FormControl()
    });
    this.isChecked = false;
  }

  onChkChange() {
    console.log('Checked value changed.');
    this.isChecked = (this.isChecked !== true);
  }


  ngOnInit(): void {
    this.isChecked = false;
    this.voucherService.readAll().subscribe(
      voucherList => this.data = voucherList
    );
  }

  resetSearch() {
    this.form = new FormGroup({
      initDate: new FormControl(),
      endDate: new FormControl()

    });
    this.ngOnInit();
  }
  search() {
    if (this.dateFrom.isValid() && this.dateTo.isValid()) {
      this.voucherService.search(
        this.isChecked,
        this.dateFrom.format('YYYY-MM-DD') + 'T00:00:00',
        this.dateTo.format('YYYY-MM-DD') + 'T23:59:59',
      ).subscribe(
        resp => {
          this.data = resp;
        }, error => {
          this.showMessage('Error when searching data.');
        }
      );
    }
  }

  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }
  dateEndChange(date) {
    this.dateTo = date.value;
  }

  dateInitChange(date) {
    this.dateFrom = date.value;
  }

  update(voucher: Voucher) {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Update',
        voucher: {id: voucher.id, dateOfUse: voucher.dateOfUse}
      }
    };
    this.dialog.open(VoucherConsumedDialogComponent, dialogConfig).afterClosed().subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      });
  }
  create() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Create',
        voucher: this.voucher
      }
    };
    this.dialog.open(VoucherNewDialogComponent, dialogConfig).afterClosed().subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      });
  }
}
