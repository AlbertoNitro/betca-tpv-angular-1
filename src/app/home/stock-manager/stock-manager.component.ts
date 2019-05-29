import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, AbstractControl} from '@angular/forms';
import {Validators, ValidatorFn} from '@angular/forms';
import {ArticleDetailModel} from '../shared/article-detail-model';
import {StockManagerService} from './stock-manager.service';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  static URL = 'stock-manager';
  stockManagerForm: FormGroup;
  stockManagerReservationForm: FormGroup;
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
