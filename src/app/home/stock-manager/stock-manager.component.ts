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
  }

}
