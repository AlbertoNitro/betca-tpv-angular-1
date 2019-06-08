import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {ArticleFamilyViewElement} from './article-family-view-element.model';


@Injectable()
export class ArticleFamilyViewService {

  constructor(private httpService: HttpService) {
  }

  readFamilyCompositeByDesc(familyDescription: string): Observable<ArticleFamilyViewElement[]> {
    return this.httpService
      .param('description', familyDescription)
      .get(ApiEndpoint.ARTICLES_FAMILY + ApiEndpoint.ARTICLES_FAMILY_COMPOSITE);
  }

}
