import {Component} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StatisticsService} from '../shared/statistics.service';
import {Statistic} from '../shared/statistic.model';
import {MatSnackBar} from '@angular/material';
import {Moment} from 'moment';
import {GenericMatSelect} from '../shared/generic-mat-select.model';

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
  statisticSelect: GenericMatSelect;
  statistics: GenericMatSelect[] = [
    {value: 'total-sales-per-day', viewValue: 'Total sales per day'},
    {value: 'average-daily-expense', viewValue: 'Average daily expense'}
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

  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }

  search() {
    this.statisticsService
      .getDataStatistic(
        this.statisticSelect.value,
        this.dateFrom.format('YYYY-MM-DD') + 'T00:00:00',
        this.dateTo.format('YYYY-MM-DD') + 'T23:59:59')
      .subscribe(
      resp => {
        if (resp.length > 0) {
          this.data = [new Statistic(this.statisticSelect.viewValue, resp)];
        } else {
          this.data = [];
          this.showMessage('No data between those dates');
        }
      },
      error => {
        this.showMessage('Error when searching data.');
      }
    );
  }

  statisticSelected(statisticSelect) {
    this.statisticSelect = {
      value: statisticSelect.value,
      viewValue: statisticSelect.source.selected._element.nativeElement.innerText.trim()
    };
  }
}
