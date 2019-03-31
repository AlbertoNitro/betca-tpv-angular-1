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

  readOne(code: String): Observable<Alarm> {
    return this.httpService.get(ApiEndpoint.ALARMS + '/' + code);
  }

  create(alarm: Alarm): Observable<Alarm> {
    return this.httpService.successful('The alarm was created').post(ApiEndpoint.ALARMS, alarm);
  }

  update(alarm: Alarm): Observable<Alarm> {
    return this.httpService.successful('The alarm was updated').put(ApiEndpoint.ALARMS + '/' + alarm.code, alarm);
  }

  delete(code: String): Observable<Alarm> {
    return this.httpService.successful('The alarm was deleted').delete(ApiEndpoint.ALARMS + '/' + code);
  }
}
