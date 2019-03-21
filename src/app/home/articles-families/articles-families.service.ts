import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {ArticleMinimum} from '../shared/article-minimum.model';
import {ArticleFamily} from './articles-families.model';

@Injectable()
export class ArticleFamilyService {

  constructor(private httpService: HttpService) {
  }

  createFamilyArticle(description: string, articleMinimumDto: ArticleMinimum): Observable<ArticleMinimum> {
    return this.httpService.param('description', description).post(ApiEndpoint.ARTICLE_FAMILY_ARTICLE, articleMinimumDto);
  }

  createFamilyComposite(description: string, familyCompositeDto: ArticleFamily): Observable<ArticleFamily> {
    return this.httpService.param('description', description).post(ApiEndpoint.ARTICLE_FAMILY_COMPOSITE, familyCompositeDto);
  }

  deleteFamilyComposite(description: string): Observable<ArticleFamilyMinimum> {
    return this.httpService.param('description', description).delete(ApiEndpoint.ARTICLES_FAMILY);
  }

  readAllFamilies(): Observable<ArticleFamilyMinimum[]> {
    return this.httpService.param('familyType', 'ARTICLES').get(ApiEndpoint.ARTICLES_FAMILY);
  }
}
