import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
}
