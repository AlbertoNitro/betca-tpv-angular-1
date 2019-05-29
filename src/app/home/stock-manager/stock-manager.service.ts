import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {ArticleDetailModel} from '../shared/article-detail-model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class StockManagerService {
  constructor(private httpService: HttpService) {
  }

  getArticlesMinimum(limit): Observable<ArticleDetailModel[]> {
    console.log('servicio:');
    const result = this.httpService.get(ApiEndpoint.ARTICLES_MINIMUM + '/' + limit);
    console.log('total ' + result);
    console.log('result :' + result.forEach(element => {
      console.log('elem ' + element);
    })
    );
    return result;
  }
}
