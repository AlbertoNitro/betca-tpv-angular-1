import {ApiEndpoint} from './api-endpoint.model';
import {HttpService} from '../../core/http.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Serie} from './serie.model';

@Injectable()
export class StatisticsService {
  constructor(private httpService: HttpService) {
  }

  getDataStatistic(statistic: string, dateFrom: string, dateTo: string): Observable<Serie[]> {
    return this.httpService.param('dateFrom', dateFrom).param('dateTo', dateTo).get(ApiEndpoint.STATISTICS + '/' + statistic);
  }
}
