import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {Rgpd} from './rgpd.model';

@Injectable()
export class RgpdService {
  static URL_AGREEMENT = '/rgpd/agreement';

  constructor(private httpService: HttpService) {
  }

  createPrintableAgreement(type: Rgpd): Observable<Rgpd> {
    console.log('Call Service ' + RgpdService.URL_AGREEMENT );
    return this.httpService.post(RgpdService.URL_AGREEMENT, type);
  }
}
