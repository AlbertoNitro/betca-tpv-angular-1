import {Component} from '@angular/core';
import {ArticleQueryModel} from '../../shared/article-query.model';

@Component({
  selector: 'app-advanced-search',
  templateUrl: 'advanced-search.component.html'
})
export class AdvancedSearchComponent {

  article: ArticleQueryModel;

  title = 'Articles';
  columns = ['code', 'description', 'retail Price', 'stock'];
  data: ArticleQueryModel[];

  createButton = false;
  editButton = false;
  deleteButton = false;

  constructor() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
    this.data = null;
  }

  search() {

  }

  searchPartiallyProducts() {

  }

  resetSearch() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
  }

  add(article: ArticleQueryModel) {

  }
}
