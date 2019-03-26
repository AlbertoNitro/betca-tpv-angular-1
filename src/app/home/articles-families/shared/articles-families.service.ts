import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Observable} from 'rxjs';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {ArticleFamily} from './articles-families.model';

@Injectable()
export class ArticleFamilyService {

  constructor(private httpService: HttpService) {
  }

  attachToFamily(description: string, articleFamily: ArticleFamily): Observable<ArticleFamily> {
    return this.httpService.post(ApiEndpoint.ARTICLES_FAMILY + '/' + description, articleFamily);
  }

  createFamilyComposite(description: string, familyCompositeDto: ArticleFamily): Observable<ArticleFamily> {
    return this.httpService.param('description', description).post(ApiEndpoint.ARTICLE_FAMILY_CREATE, familyCompositeDto);
  }

  deleteComponentFromFamily(description: string, childDescription: string): Observable<null> {
    return this.httpService.param('childDescription', childDescription).delete(ApiEndpoint.ARTICLES_FAMILY + '/' + description);
  }

  deleteFamilyComposite(description: string): Observable<null> {
    return this.httpService.param('description', description).delete(ApiEndpoint.ARTICLES_FAMILY);
  }

  readAllComponentsInAFamily(description: string): Observable<ArticleFamily[]> {
    return this.httpService.get(ApiEndpoint.ARTICLES_FAMILY + '/' + description);
  }

  readAllFamilyComposites(familyType: string): Observable<ArticleFamilyMinimum[]> {
    return this.httpService.param('familyType', familyType).get(ApiEndpoint.ARTICLES_FAMILY);
  }
}
