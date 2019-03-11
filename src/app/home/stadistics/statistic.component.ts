import {Component} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class StatisticComponent {

  static URL = 'statistics';
  data: any[];
  endDate: Date;
  statisticSelect: string;
  statistics = [
    {value: 'estadistica-1', viewValue: 'Estadistica 1'},
    {value: 'estadistica-2', viewValue: 'Estadistica 2'}
  ];
  form: FormGroup;
  initDate: Date;
  xAxisLabel = 'x label';
  yAxisLabel = 'y label';

  constructor() {
    this.data = [];
    this.form = new FormGroup({
      initDate: new FormControl(),
      endDate: new FormControl(),
      statisticSelected: new FormControl()
    });
  }

  dateEndChange(date) {
    this.endDate = date.value;
  }

  dateInitChange(date) {
    this.initDate = date.value;
  }

  isLoadedData() {
    return this.data && this.data.length > 0;
  }

  statisticSelected(statisticSelect) {
    this.statisticSelect = statisticSelect.value;
  }
}
