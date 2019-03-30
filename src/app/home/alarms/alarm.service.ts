import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class AlarmService {

  constructor(private httpService: HttpService) {
  }

}
