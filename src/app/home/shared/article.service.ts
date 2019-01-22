import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Article} from './article.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class ArticleService {
  static END_POINT = '/articles';

  static INCOMPLETES = '/incompletes';
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  readOne(code: String): Observable<Article> {
    return this.httpService.bearerAuth().get(ArticleService.END_POINT + '/' + code);
  }

  readAll() {
    return this.httpService.bearerAuth().get(ArticleService.END_POINT);
  }

  readAllIncompletes() {
    return this.httpService.bearerAuth().get(ArticleService.END_POINT + ArticleService.INCOMPLETES);
  }

  create(article: Article): Observable<Article> {
    return this.httpService.bearerAuth().successful().post(ArticleService.END_POINT, article);

  }

  update(article: Article): Observable<Article> {
    return this.httpService.bearerAuth().successful().put(ArticleService.END_POINT + '/' + article.code, article);
  }

  readAdvancedSearch(article: Article): Observable<Article[]> {
    let httpservice = this.httpService.bearerAuth();
    if (article.description) {
      httpservice = httpservice.param('description', article.description);
    }
    if (article.reference) {
      httpservice = httpservice.param('reference', article.reference);
    }
    if (article.provider) {
      httpservice = httpservice.param('provider', article.provider);
    }
    return httpservice.get(ArticleService.END_POINT + ArticleService.SEARCH);
  }

  updateStock(code: string, stock: number): void {
    const article: Article = {code: code, stock: stock};
    this.httpService.bearerAuth().successful().patch(ArticleService.END_POINT + `/${code}`, article).subscribe(
      () => true
    );
  }

}
