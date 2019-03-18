import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {Article} from './article.model';
import {ApiEndpoint} from './api-endpoint.model';
import {FormGroup} from '@angular/forms';
import {ArticleQueryModel} from './article-query.model';
import {ArticleMinimum} from './article-minimum.model';

@Injectable()
export class ArticleService {
  static createFamilySizes(familySizesForm: FormGroup): any {
    throw new Error('Method not implemented.');
  }

  constructor(private httpService: HttpService) {
  }

  readOne(code: String): Observable<Article> {
    return this.httpService.get(ApiEndpoint.ARTICLES + '/' + code);
  }

  create(article: Article): Observable<Article> {
    return this.httpService.successful().post(ApiEndpoint.ARTICLES, article);
  }

  // TODO: API connection
  createFamilySizes(familySizesForm) {
    const formData = new FormData(familySizesForm);
    console.log('Here is the form data! ', formData);
  }

  readPartiallyDefined(): Observable<Article[]> {
    return this.httpService.get(ApiEndpoint.ARTICLES);
  }

  /*
  readArticlesQuery(article: ArticleQueryModel): Observable<Article[]> {
    return this.httpService.param('code', article.description).get(ApiEndpoint.ARTICLES);
  }
  */
  readArticlesQuery(code: string): Observable<Article[]> {
    return this.httpService.get(ApiEndpoint.ARTICLES + '/' + code);
  }

  readAllArticleMinimum(): Observable<ArticleMinimum> {
    return this.httpService.get(ApiEndpoint.ARTICLES + ApiEndpoint.MINIMUM);
  }
}
