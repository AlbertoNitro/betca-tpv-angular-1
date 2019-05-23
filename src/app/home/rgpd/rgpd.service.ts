import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {Rgpd} from './rgpd.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class RgpdService {

  constructor(private httpService: HttpService) {
  }

  createPrintableAgreement(type: Rgpd): Observable<Rgpd> {
    return this.httpService.post(ApiEndpoint.RGPD_AGREEMENT, type);
  }

  getUserAgreement(): Observable<Rgpd> {
    return this.httpService.get(ApiEndpoint.RGPD_USER_AGREEMENT);
  }

  createUserAgreement(rgpd: Rgpd): Observable<Rgpd> {
    return this.httpService.post(ApiEndpoint.RGPD_USER_AGREEMENT, rgpd);
  }

  deleteUserAgreement(): Observable<any> {
    return this.httpService.delete(ApiEndpoint.RGPD_USER_AGREEMENT);
  }
}
