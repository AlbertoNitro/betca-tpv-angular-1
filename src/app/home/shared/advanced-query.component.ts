import {Component} from '@angular/core';
import {ArticleQueryModel} from './article-query.model';

@Component({
  selector: 'app-advanced-query',
  templateUrl: './advanced-query.component.html',
  styleUrls: ['./advanced-query.component.css']
})
export class AdvancedQueryComponent {

  article: ArticleQueryModel;

  constructor() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
  }

  search() {

  }

  searchPartiallyProducts() {

  }

  resetSearch() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
  }
}
