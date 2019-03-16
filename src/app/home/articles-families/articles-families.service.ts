import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {ArticleFamily} from './articles-families.model';

@Injectable()
export class ArticleFamilyService {
  data: ArticleFamily[] = [{description: 'Games'}, {description: 'Books'}];

  constructor(private httpService: HttpService) {
  }

  readAllFamilies(): ArticleFamily[] {
    return this.data;
  }
}
