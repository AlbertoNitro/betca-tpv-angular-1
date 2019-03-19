import {Component} from '@angular/core';
import {VoucherService} from './voucher.service';
import {Voucher} from './voucher.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


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

export class VouchersComponent {
  static URL = 'vouchers';
  voucher: Voucher;
  onlyConsumed = true;
  form: FormGroup;
  initDate: Date;
  endDate: Date;
  title = 'Vouchers management';
  columns = ['id', 'value'];
  data: Voucher[];
  constructor(fb: FormBuilder, private voucherService: VoucherService) {
    this.form = new FormGroup({
      initDate: new FormControl(),
      endDate: new FormControl()

    });
  }

  search() {
    // TODO implement search with fields
    this.data = [
      {id: '1', value: 20, creationDate: new Date(), dateOfUse: null},
      {id: '2', value: 40, creationDate: new Date(), dateOfUse: null},
      {id: '3', value: 5, creationDate: new Date(), dateOfUse: null},
    ];
  }

  dateEndChange(date) {
    this.endDate = date.value;
  }

  dateInitChange(date) {
    this.initDate = date.value;
  }

  create() {
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }
}
