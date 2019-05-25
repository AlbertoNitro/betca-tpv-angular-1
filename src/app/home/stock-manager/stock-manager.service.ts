import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable, of} from 'rxjs';
import {ArticleDetailModel} from '../shared/article-detail-model';

@Injectable()
export class StockManagerService {
  constructor(private httpService: HttpService) {
  }
}
