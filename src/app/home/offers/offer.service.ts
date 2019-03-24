import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '../../core/http.service';
import { ApiEndpoint } from '../shared/api-endpoint.model';

import { CreateOffer } from './offer.model';
import { Offer } from './offer.model';

@Injectable()
export class OfferService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Offer[]> {
    return this.httpService.get(ApiEndpoint.OFFERS);
  }

  create(offer: CreateOffer): Observable<any> {
    console.log(offer, '<<<<< OFFER CREATED - Service');
    return of(offer);
    // TODO: implement Offer Create (API connection - POST /offers)
    return this.httpService.post(ApiEndpoint.OFFERS, offer);
  }

  delete(offer: Offer): Observable<any> {
    console.log(offer, '<<<<<<<<< OFFER DELETED - Service');
    return this.httpService.delete(ApiEndpoint.OFFERS + '/' + offer.id);
  }

}
