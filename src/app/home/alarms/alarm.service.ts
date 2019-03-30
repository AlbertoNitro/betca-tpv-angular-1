import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Alarm} from './alarm.model';

@Injectable()
export class AlarmService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Alarm[]> {
    return this.httpService.get(ApiEndpoint.ALARMS);
  }
}
