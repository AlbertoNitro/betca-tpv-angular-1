import {Component} from '@angular/core';

import {ArticleQueryModel} from '../shared/article-query.model';
import {ArticleDetailModel} from './article-detail-model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent {
  static URL = 'articles';

  article: ArticleQueryModel;

  title = 'Articles Management';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  data: ArticleDetailModel[];

  constructor() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
  }

  updateData(data) {
    console.log(data);
    this.data = data;
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

