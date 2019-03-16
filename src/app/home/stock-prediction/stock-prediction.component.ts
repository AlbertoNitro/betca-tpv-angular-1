import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export enum PeriodicallyType {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Annual'
}

export enum PeriodType {
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year'
}

export interface ArticleWithIdAndNameDto {
  id: string;
  name: string;
  picture: string;
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
  static DUMMY_ARTICLE_LIST: ArticleWithIdAndNameDto[] = [
    {
      id: '0',
      name: 'Arkansas',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/picture_of_Arkansas.svg'
    },
    {
      id: '1',
      name: 'California',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/0/01/picture_of_California.svg'
    },
    {
      id: '2',
      name: 'Florida',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/picture_of_Florida.svg'
    },
    {
      id: '3',
      name: 'Texas',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/picture_of_Texas.svg'
    }
  ];
  static DUMMY_STOCK_PREDICTION_TABLE_DATA: StockPredictionOutputDto[] = [
    {period: PeriodType.WEEK, periodNumber: 1, stock: 1028},
    {period: PeriodType.WEEK, periodNumber: 2, stock: 964},
    {period: PeriodType.WEEK, periodNumber: 3, stock: 900},
    {period: PeriodType.WEEK, periodNumber: 4, stock: 837}
  ];
  stockPredictionForm: FormGroup;
  periodTypeList: PeriodicallyType[] = [PeriodicallyType.WEEKLY, PeriodicallyType.MONTHLY, PeriodicallyType.YEARLY];
  periodsNumberList: number[] = this.weeklyPeriodsNumberList();
  filteredArticles: Observable<ArticleWithIdAndNameDto[]>;
  articleList: ArticleWithIdAndNameDto[];
  stockPredictionTableTitle = 'Stock Prediction';
  stockPredictionTableColumns: string[] = ['Period Type', 'Period Number', 'Stock Prediction'];
  stockPredictionTableData: StockPredictionOutputDto[];

  constructor(private formBuilder: FormBuilder) {
  }

  get articleFormControl() {
    return this.stockPredictionForm.get('articleFormControl');
  }

  get periodTypeFormControl() {
    return this.stockPredictionForm.get('periodTypeFormControl');
  }

  get periodsNumberFormControl() {
    return this.stockPredictionForm.get('periodsNumberFormControl');
  }

  ngOnInit() {
    this.articleList = StockPredictionComponent.DUMMY_ARTICLE_LIST;
    this.stockPredictionForm = this.formBuilder.group({
        articleFormControl: ['', [Validators.required]],
        periodTypeFormControl: ['', [Validators.required]],
        periodsNumberFormControl: ['', [Validators.required]]
      }
    );
    this.periodTypeFormControl.setValue(PeriodicallyType.WEEKLY);
    this.periodsNumberFormControl.setValue(1);
    this.filteredArticles = this.articleFormControl.valueChanges
      .pipe(
        startWith<string | ArticleWithIdAndNameDto>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterArticlesByName(name) : this.articleList.slice())
      );
  }

  onSubmit() {
    const articleId = this.articleFormControl.value;
    const periodType = this.periodTypeFormControl.value;
    const periodsNumber = this.periodsNumberFormControl.value;
    console.log(`onSubmit values: { articleId: ${articleId}, periodType: ${periodType}, periodsNumber: ${periodsNumber} }`);
    this.stockPredictionTableData = StockPredictionComponent.DUMMY_STOCK_PREDICTION_TABLE_DATA;
  }

  onChangePeriodType() {
    const periodType = this.periodTypeFormControl.value;
    console.log('onChangePeriodType -> value: ' + periodType);
    if (PeriodicallyType.WEEKLY === periodType) {
      this.periodsNumberList = this.weeklyPeriodsNumberList();
    } else if (PeriodicallyType.MONTHLY === periodType) {
      this.periodsNumberList = this.monthlyPeriodsNumberList();
    } else if (PeriodicallyType.YEARLY === periodType) {
      this.periodsNumberList = this.annualPeriodsNumberList();
    } else {
      console.log('No Action for PeriodicallyType: ' + periodType);
    }
    this.periodsNumberFormControl.setValue(1);
  }

  displayArticleName(article?: ArticleWithIdAndNameDto): string | undefined {
    return article ? article.name : undefined;
  }

  private filterArticlesByName(articleName: string): ArticleWithIdAndNameDto[] {
    const filterValue = articleName.toLowerCase();
    return this.articleList.filter(article => article.name.toLowerCase().indexOf(filterValue) === 0);
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
