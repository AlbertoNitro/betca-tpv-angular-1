import {Component} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StatisticsService} from '../shared/statistics.service';
import {Statistic} from '../shared/statistic.model';
import {MatSnackBar} from '@angular/material';
import {Moment} from 'moment';

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
  data: Statistic[];
  dateTo: Moment;
  statisticSelect: string;
  statistics = [
    {value: 'totalSalesPerDay', viewValue: 'Total sales per day'},
    {value: 'averageDailyExpense', viewValue: 'Average daily expense'}
  ];
  form: FormGroup;
  dateFrom: Moment;
  xAxisLabel = 'Date';
  yAxisLabel = 'Value';

  constructor(private snackBar: MatSnackBar, private statisticsService: StatisticsService) {
    this.form = new FormGroup({
      initDate: new FormControl(),
      endDate: new FormControl(),
      statisticSelected: new FormControl()
    });
  }

  dateEndChange(date) {
    this.dateTo = date.value;
  }

  dateInitChange(date) {
    this.dateFrom = date.value;
  }

  isLoadedData() {
    return this.data && this.data.length > 0;
  }

  search() {
    this.statisticsService
      .getDataStatistic(
        this.statisticSelect,
        this.dateFrom.format('YYYY-MM-DD') + 'T00:00:00',
        this.dateTo.format('YYYY-MM-DD') + 'T23:59:59')
      .subscribe(
      resp => {
        this.data = [new Statistic(this.statisticSelect, resp)];
      },
      error => {
        this.snackBar.open('Error when searching data.', '', {
          duration: 2000
        });
      }
    );
  }

  statisticSelected(statisticSelect) {
    this.statisticSelect = statisticSelect.value;
  }
}
