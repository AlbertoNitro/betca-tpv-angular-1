import {Component, EventEmitter, Output} from '@angular/core';

import {ArticleQueryModel} from './article-query.model';
import {ArticleService} from './article.service';
import {Article} from './article.model';
import {ArticleDetailModel} from './article-detail-model';

@Component({
  selector: 'app-advanced-query',
  templateUrl: './articles-query.component.html',
  styleUrls: ['./articles-query.component.css']
})
export class ArticlesQueryComponent {

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

  searchPartiallyDefined() {
    this.articleService.readPartiallyDefined().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  resetSearch() {
    this.article = {description: null, stock: null, maxPrice: null, minPrice: null};
  }
}
