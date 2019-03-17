import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '../../core/http.service';
import { ApiEndpoint } from '../shared/api-endpoint.model';

import { Offer } from './offer.model';
import { OFFERSMOCK } from './offers.mock';

@Injectable()
export class OfferService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Offer[]> {
    // TODO: change MOCK implement for API request (GET /offers)
    // return this.httpService.get(ApiEndpoint.OFFERS);
    return of(OFFERSMOCK);
  }

  /*delete(offer: Offer): Observable<Offer> {
    // TODO: implement Offer Delete (API connection)
    console.log(offer, '<<<<<<<<< Deleted Offer');
    return offer;
  }*/

}
