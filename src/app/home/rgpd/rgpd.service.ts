import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {Rgpd} from './rgpd.model';

@Injectable()
export class RgpdService {
  static URL_AGREEMENT = '/rgpd/agreement';

  static USER_AGREEMENT = '/rgpd/useragreement';

  constructor(private httpService: HttpService) {
  }

  createPrintableAgreement(type: Rgpd): Observable<Rgpd> {
    console.log('Call Service print agreement ' + RgpdService.URL_AGREEMENT);
    return this.httpService.post(RgpdService.URL_AGREEMENT, type);
  }

  getUserAgreement(): Observable<Rgpd> {
    console.log('Call Service get user agreement ' + RgpdService.USER_AGREEMENT);
    return this.httpService.get(RgpdService.USER_AGREEMENT);
  }

  createUserAgreement(rgpd: Rgpd): Observable<Rgpd> {
    console.log('Call Service accept user agreement ' + RgpdService.USER_AGREEMENT);
    return this.httpService.post(RgpdService.USER_AGREEMENT, rgpd);
  }

  deleteUserAgreement(): Observable<any> {
    console.log('Call Service revoke user agreement ' + RgpdService.USER_AGREEMENT);
    return this.httpService.delete(RgpdService.USER_AGREEMENT);
  }
}
