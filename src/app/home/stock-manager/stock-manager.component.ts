import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ArticleDetailModel} from '../shared/article-detail-model';
import {StockManagerService} from './stock-manager.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log('fecha: ' + control.value);
    const date = new Date(control.value);
    const invalidDate = !control.value || date.getMonth === undefined;
    return invalidDate ? {'invalidDate': {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class StockManagerComponent implements OnInit {
  static URL = 'stock-manager';
  stockManagerForm: FormGroup;
  stockManagerDateForm: FormGroup;
  stockManagerReservationForm: FormGroup;
  dateFrom: Moment;
  listTitle = 'Stock manager';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  articleList: ArticleDetailModel[];

  constructor(private formBuilder: FormBuilder, private stockManagerService: StockManagerService) {
  }

  ngOnInit() {
    this.stockManagerForm = this.formBuilder.group({
        minimum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      }
    );
    this.stockManagerDateForm = this.formBuilder.group({
        dateSold: [new FormControl({value: '', disabled: true}), [Validators.required, dateValidator()]],
      }
    );
    this.stockManagerReservationForm = this.formBuilder.group({
        reservation: ['', [Validators.required, Validators.pattern('^(0)')]],
      }
    );
  }

  searchStockMin() {
    console.log('stockManagerForm ' + this.stockManagerForm.get('minimum').value);
    const limit = 1 + this.stockManagerForm.get('minimum').value;
    this.stockManagerService.getArticlesMinimum(limit).subscribe(
      articleList => {
        this.articleList = articleList;
        console.log('art list ' + this.articleList.length);
      }
    );
  }

  resetSearchStock() {
    console.log('reset search Stock');
    this.stockManagerForm.reset();
  }

  dateInitChange(date) {
    this.dateFrom = date.value;
  }

  searchStockDate() {
    console.log('stockManagerDateForm ' + this.stockManagerDateForm.get('dateSold').value);
    const dateSold = this.dateFrom.format('YYYY-MM-DD') + 'T00:00:00';
    console.log('stockManagerDateForm ' + dateSold);
    this.stockManagerService.getArticleDateSold(dateSold).subscribe(
      articleList => {
        this.articleList = articleList;
        console.log('art list ' + this.articleList.length);
      }
    );
  }

  resetSearchStockDate() {
    console.log('reset search Stock date');
    this.stockManagerDateForm.reset();
  }

  searchStockReservation() {
    console.log('stockManagerReservationForm ' + this.stockManagerReservationForm.get('reservation').value);
    this.stockManagerService.getArticlesReservation().subscribe(
      articleList => {
        this.articleList = articleList;
        console.log('art list ' + this.articleList.length);
      }
    );
  }

  resetSearchStockReservation() {
    console.log('reset search Stock Reservation');
    this.stockManagerReservationForm.reset();
  }
}
