import {Component, EventEmitter, Output} from '@angular/core';

import {ArticleQueryModel} from './article-query.model';
import {ArticleService} from './article.service';
import {Article} from './article.model';
import {ArticleDetailModel} from './article-detail-model';

@Component({
  selector: 'app-advanced-query',
  templateUrl: './advanced-query.component.html',
  styleUrls: ['./advanced-query.component.css']
})
export class AdvancedQueryComponent {

  article: ArticleQueryModel;
  data: ArticleDetailModel[];
  @Output() emitter = new EventEmitter<Article[]>();

  constructor(private articleService: ArticleService) {
    this.article = {description: null, stock: null, maxPrice: null, minPrice: null};
    this.data = null;
  }

  search() {
    this.articleService.readArticlesQuery(this.article).subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.emitter.emit(this.data);
        }
    );
  }

  // Mock
  /*
  search() {
    this.data = [
      {code: '1', description: 'd1', stock: 0, retailPrice: 50},
      {code: '2', description: 'd2', stock: 20, retailPrice: 60},
      {code: '3', description: 'd3', stock: 50, retailPrice: 23}
    ];
    console.log(this.data);
    this.emitter.emit(this.data);
  }
  */

  searchPartiallyDefined() {
    this.articleService.readPartiallyDefined().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  // Mock
  /*
  searchPartiallyDefined() {
    this.data = [
      {code: '4', description: 'd4-Partially', stock: 0, retailPrice: 50},
      {code: '5', description: 'd5-Partially', stock: 20, retailPrice: 60},
      {code: '6', description: 'd6-Partially', stock: 50, retailPrice: 23}
    ];
    console.log(this.data);
    this.emitter.emit(this.data);
  }
  */
  resetSearch() {
    this.article = {description: null, stock: null, maxPrice: null, minPrice: null};
  }
}
