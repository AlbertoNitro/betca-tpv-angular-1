import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Provider} from './provider.model';

@Injectable()
export class ProviderService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Provider[]> {
    return this.httpService.get(ApiEndpoint.PROVIDERS);
  }

  readAllActives(): Observable<Provider[]> {
    return this.httpService.get(ApiEndpoint.PROVIDERS + ApiEndpoint.ACTIVES);
  }
}
