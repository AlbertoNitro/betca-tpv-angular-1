import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Article} from './article.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class ArticleService {
  static END_POINT = '/articles';

  constructor(private httpService: HttpService) {
  }

  readOne(code: String): Observable<Article> {
    return this.httpService.bearerAuth().get(ArticleService.END_POINT + '/' + code);
  }

  create(article: Article): Observable<Article> {
    return this.httpService.bearerAuth().successful().post(ArticleService.END_POINT, article);

  }

}
