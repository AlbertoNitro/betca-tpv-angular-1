import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleDetailModel} from '../shared/article-detail-model';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  static URL = 'stock-manager';
  stockManagerForm: FormGroup;
  listTitle = 'Stock manager';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  articleList: ArticleDetailModel[];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.stockManagerForm = this.formBuilder.group({
        minimum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      }
    );
  }

  searchStockMin() {
    console.log('stockManagerForm ' + this.stockManagerForm.get('minimum').value);
    const limit = this.stockManagerForm.get('minimum').value;
    console.log('limit ' + limit);
  }

  resetSearchStock() {
    console.log('reset search Stock');
    this.stockManagerForm.reset();
  }

}
