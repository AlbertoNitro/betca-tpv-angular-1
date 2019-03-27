import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {Observable} from 'rxjs';


@Injectable()
export class ArticleFamilyViewService {

  constructor(private httpService: HttpService) {
  }

  readFamilyCompositeRoot(): Observable<any> {
    return this.httpService.get(ApiEndpoint.ARTICLE_FAMILY_COMPOSITE_ROOT);
  }

}
