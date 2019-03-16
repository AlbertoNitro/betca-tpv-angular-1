import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import { Offer } from './offer.model';
import { OFFERS } from './offers.mock';

@Injectable()
export class OfferService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Offer[]> {
    return of(OFFERS);
  }

}
