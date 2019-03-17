import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export enum PeriodicityType {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Annual'
}

export enum PeriodType {
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year'
}

export interface ArticleWithCodeAndDescriptionDto {
  code: string;
  description: string;
}

export interface StockPredictionInputDto {
  articleCode: string;
  periodicityType: PeriodicityType;
  periodsNumber: number;
}

export interface StockPredictionOutputDto {
  period: PeriodType;
  periodNumber: number;
  stock: number;
}

@Component({
  selector: 'app-stock-prediction',
  templateUrl: './stock-prediction.component.html',
  styleUrls: ['./stock-prediction.component.css']
})
export class StockPredictionComponent implements OnInit {
  static URL = 'stock-prediction';
  static DUMMY_ARTICLE_LIST: ArticleWithCodeAndDescriptionDto[] = [
    {
      code: '8400000000017',
      description: 'Zarzuela - Falda T2'
    },
    {
      code: '8400000000024',
      description: 'Zarzuela - Falda T4'
    },
    {
      code: '8400000000031',
      description: 'descrip-a3'
    },
    {
      code: '8400000000048',
      description: 'descrip-a4'
    }
  ];
  static DUMMY_STOCK_PREDICTION_TABLE_DATA: StockPredictionOutputDto[] = [
    {period: PeriodType.WEEK, periodNumber: 1, stock: 1028},
    {period: PeriodType.WEEK, periodNumber: 2, stock: 964},
    {period: PeriodType.WEEK, periodNumber: 3, stock: 900},
    {period: PeriodType.WEEK, periodNumber: 4, stock: 837}
  ];
  stockPredictionForm: FormGroup;
  periodicityTypeList: PeriodicityType[] = [PeriodicityType.WEEKLY, PeriodicityType.MONTHLY, PeriodicityType.YEARLY];
  periodsNumberList: number[] = this.weeklyPeriodsNumberList();
  articleList: ArticleWithCodeAndDescriptionDto[];
  stockPredictionTableTitle = 'Stock Prediction';
  stockPredictionTableColumns: string[] = ['period', 'periodNumber', 'stock'];
  stockPredictionTableData: StockPredictionOutputDto[];

  constructor(private formBuilder: FormBuilder) {
  }

  get articleFormControl() {
    return this.stockPredictionForm.get('articleFormControl');
  }

  get periodicityTypeFormControl() {
    return this.stockPredictionForm.get('periodicityTypeFormControl');
  }

  get periodsNumberFormControl() {
    return this.stockPredictionForm.get('periodsNumberFormControl');
  }

  ngOnInit() {
    this.articleList = StockPredictionComponent.DUMMY_ARTICLE_LIST;
    this.stockPredictionForm = this.formBuilder.group({
        articleFormControl: ['', [Validators.required]],
        periodicityTypeFormControl: ['', [Validators.required]],
        periodsNumberFormControl: ['', [Validators.required]]
      }
    );
    this.periodicityTypeFormControl.setValue(PeriodicityType.WEEKLY);
    this.periodsNumberFormControl.setValue(1);
  }

  onSubmit() {
    const stockPredictionInputDto: StockPredictionInputDto = {
      articleCode: this.articleFormControl.value,
      periodicityType: this.periodicityTypeFormControl.value,
      periodsNumber: this.periodsNumberFormControl.value
    };
    console.log(`onSubmit values`);
    console.dir(stockPredictionInputDto);
    this.stockPredictionTableData = StockPredictionComponent.DUMMY_STOCK_PREDICTION_TABLE_DATA;
  }

  onChangePeriodicityType() {
    const periodicityType = this.periodicityTypeFormControl.value;
    console.log('onChangePeriodicityType -> value: ' + periodicityType);
    if (PeriodicityType.WEEKLY === periodicityType) {
      this.periodsNumberList = this.weeklyPeriodsNumberList();
    } else if (PeriodicityType.MONTHLY === periodicityType) {
      this.periodsNumberList = this.monthlyPeriodsNumberList();
    } else if (PeriodicityType.YEARLY === periodicityType) {
      this.periodsNumberList = this.annualPeriodsNumberList();
    } else {
      console.log('No Action for PeriodicityType: ' + periodicityType);
    }
    this.periodsNumberFormControl.setValue(1);
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
