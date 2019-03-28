import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {Article} from './article.model';
import {ApiEndpoint} from './api-endpoint.model';
import {FormGroup} from '@angular/forms';
import {ArticleMinimum} from './article-minimum.model';
import {ArticleDetailModel} from './article-detail-model';
import {ArticleQueryModel} from './article-query.model';

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

  readAll(): Observable<ArticleDetailModel[]> {
    return this.httpService.get(ApiEndpoint.ARTICLES);
  }

  create(article: Article): Observable<Article> {
    return this.httpService.successful('The article was created').post(ApiEndpoint.ARTICLES, article);
  }

  update(article: Article): Observable<Article> {
    return this.httpService.successful('The article was updated').put(ApiEndpoint.ARTICLES + '/' + article.code, article);
  }

  delete(code: String): Observable<Article> {
    return this.httpService.successful('The article was deleted').delete(ApiEndpoint.ARTICLES + '/' + code);
  }

  // TODO: API connection
  createFamilySizes(familySizesForm) {
    const formData = new FormData(familySizesForm);
    console.log('Here is the form data! ', formData);
  }

  readPartiallyDefined(): Observable<ArticleDetailModel[]> {
    return this.httpService.post(ApiEndpoint.ARTICLES_SEARCH + ApiEndpoint.PARTIALLY_DEFINED);
  }

  readArticlesQuery(article: ArticleQueryModel): Observable<ArticleDetailModel[]> {
    return this.httpService.post(ApiEndpoint.ARTICLES_SEARCH, article);
  }

  readAllArticleMinimum(): Observable<ArticleMinimum[]> {
    return this.httpService.get(ApiEndpoint.ARTICLES_MINIMUM);
  }
}
