import {Component, EventEmitter, Output} from '@angular/core';

import {ArticleQueryModel} from './article-query.model';
import {ArticleService} from './article.service';
import {Article} from './article.model';

@Component({
  selector: 'app-advanced-query',
  templateUrl: './advanced-query.component.html',
  styleUrls: ['./advanced-query.component.css']
})
export class AdvancedQueryComponent {

  article: ArticleQueryModel;
  data: Article[];
  @Output() emitter = new EventEmitter<Article[]>();

  constructor(private articleService: ArticleService) {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
    this.data = null;
  }

  /*
    search() {
      this.articleService.readArticlesQuery(this.article).subscribe(
        data => {this.data = data;
          console.log(this.data); }
      );
    }
  */

  /*
    search() {
      this.articleService.readArticlesQuery(this.article.description).subscribe(
        data => {
          this.data = data;
          this.emitter.emit(data);
          console.log('Datos en el advanced query: ');
        }
      );
    }
    */
  search() {
    this.data = [
      {code: '1', description: 'd1'},
      {code: '2', description: 'd2'},
      {code: '3', description: 'd3'}
    ];
    console.log(this.data);
    this.emitter.emit(this.data);
  }

  searchPartiallyProducts() {
    this.articleService.readPartiallyDefined().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

  resetSearch() {
    this.article = {description: null, stock: null, maximumPrice: null, minimumPrice: null};
  }
}
