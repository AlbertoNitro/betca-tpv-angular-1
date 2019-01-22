import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Ticket} from './ticket.model';
import {TicketCreation} from './ticket-creation.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class TicketService {
  static END_POINT = '/tickets';
  static SEARCH_DATE = '/search/date';
  static SEARCH_MOBILE = '/search/mobile';
  static SEARCH_MOBILE_LAST = '/search/mobile/last';
  static SEARCH_ORDER_ID = '/search/order-id';
  static SEARCH_TICKETS_NOT_COMMITED = '/search/tickets-not-commited';
  static SEARCH_FAMILY_ID = '/search/family-id';

  static NUM_PRODUCTS_SOLD = '/numProductsSold';
  static HISTORICAL_PRODUCTS = '/historicalProducts';
  static COMPARISION_INCOME = '/comparisionIncome';

  static SEARCH_BY_ID_ARTICLE = '/searchByIdAndDates?';

  constructor(private httpService: HttpService) {
  }

  create(ticketCreation: TicketCreation): Observable<any> {
    return this.httpService.bearerAuth().pdf().post(TicketService.END_POINT, ticketCreation);
  }

  readOne(id: string): Observable<Ticket> {
    return this.httpService.bearerAuth().get(TicketService.END_POINT + '/' + id);
  }

  findBetweenDates(start: Date, end: Date): Observable<Ticket[]> {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);
    return this.httpService.bearerAuth().param('start', String(start.getTime()))
      .param('end', String(end.getTime())).get(TicketService.END_POINT + TicketService.SEARCH_DATE);
  }

  findByMobile(mobile: string): Observable<Ticket[]> {
    return this.httpService.bearerAuth().param('mobile', mobile)
      .get(TicketService.END_POINT + TicketService.SEARCH_MOBILE);
  }

  findLastByMobile(mobile: number): Observable<any> {
    return this.httpService.bearerAuth().param('mobile', '' + mobile)
      .get(TicketService.END_POINT + TicketService.SEARCH_MOBILE_LAST);
  }

  readToday(): Observable<Ticket[]> {
    return this.findBetweenDates(new Date(), new Date());
  }

  updateTicket(ticketId: string, ticketCreation: TicketCreation): Observable<any> {
    return this.httpService.bearerAuth().pdf().put(TicketService.END_POINT + '/' + ticketId, ticketCreation);
  }

  readIdArticleDatesBetween(id: string): Observable<TicketCreation[]> {
    const date = new Date();
    const year = date.getFullYear();
    return this.httpService.bearerAuth()
      .param('id', id)
      .param('dateStart', year + '-01-01 00:00:00')
      .param('dateFinish', year + '-12-31 23:59:59')
      .get(TicketService.END_POINT + TicketService.SEARCH_BY_ID_ARTICLE);
  }


}
