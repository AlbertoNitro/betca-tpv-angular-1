import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export enum PeriodType {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL'
}

@Component({
  selector: 'app-stock-prediction',
  templateUrl: './stock-prediction.component.html',
  styleUrls: ['./stock-prediction.component.css']
})
export class StockPredictionComponent implements OnInit {
  static URL = 'stock-prediction';
  periodsNumberList: number[] = this.weeklyPeriodsNumberList();
  periodTypeList: PeriodType[] = [PeriodType.WEEKLY, PeriodType.MONTHLY, PeriodType.ANNUAL];
  stockPredictionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  get periodType() {
    return this.stockPredictionForm.get('periodType');
  }

  get periodsNumber() {
    return this.stockPredictionForm.get('periodsNumber');
  }

  ngOnInit() {
    this.stockPredictionForm = this.formBuilder.group({
        periodType: ['', [Validators.required]],
        periodsNumber: ['', [Validators.required]]
      }
    );

    this.periodType.setValue(PeriodType.WEEKLY);
    this.periodsNumber.setValue(1);
  }

  onSubmit() {

  }

  onChangePeriodType() {
    const periodTypeValue = this.periodType.value;
    console.log('onChangePeriodType -> value: ' + periodTypeValue);
    if (PeriodType.WEEKLY === periodTypeValue) {
      this.periodsNumberList = this.weeklyPeriodsNumberList();
    } else if (PeriodType.MONTHLY === periodTypeValue) {
      this.periodsNumberList = this.monthlyPeriodsNumberList();
    } else if (PeriodType.ANNUAL === periodTypeValue) {
      this.periodsNumberList = this.annualPeriodsNumberList();
    } else {
      console.log('No Action for PeriodType: ' + periodTypeValue);
    }
    this.periodsNumber.setValue(1);
  }

  private weeklyPeriodsNumberList(): number[] {
    return this.range(1, 26, 1);
  }

  private monthlyPeriodsNumberList(): number[] {
    return this.range(1, 12, 1);
  }

  private annualPeriodsNumberList(): number[] {
    return this.range(1, 2, 1);
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }
}
