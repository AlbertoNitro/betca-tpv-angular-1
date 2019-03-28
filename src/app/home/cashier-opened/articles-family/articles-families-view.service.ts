import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {Observable} from 'rxjs';


@Injectable()
export class ArticleFamilyViewService {

  constructor(private httpService: HttpService) {
  }

  readFamilyCompositeRoot(familyDescription: string): Observable<any> {
    return this.httpService
      .param('description', familyDescription)
      .get(ApiEndpoint.ARTICLES_FAMILY + ApiEndpoint.ARTICLES_FAMILY_COMPOSITE);
  }

}
