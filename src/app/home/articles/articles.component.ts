import {Component} from '@angular/core';

import {ArticleQueryModel} from '../shared/article-query.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent {
  static URL = 'articles';

  article: ArticleQueryModel;

  title = 'Articles Management';
  columns = ['code', 'description', 'retail Price', 'stock'];
  data: ArticleQueryModel[];

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

  create() {

  }

  read(article: ArticleQueryModel) {

  }

  update(article: ArticleQueryModel) {

  }

  delete(article: ArticleQueryModel) {

  }
}

