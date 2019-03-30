import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Ticket} from './models/ticket.model';
import {TicketQueryOutput} from './models/ticket-query-output.model';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {TicketQueryInput} from './models/ticket-query-input.model';



@Injectable()
export class TicketsService {
  constructor(private httpService: HttpService) {
  }

  readOne(id: string): Observable<Ticket> {
    return this.httpService.get(ApiEndpoint.TICKETS + '/' + id);
  }

  updateTicket(id: string, ticket: Ticket): Observable<Ticket> {
    return this.httpService.pdf().put(ApiEndpoint.TICKETS + '/' + id, ticket);
  }

  advancedTicketQuery(apiPath: string, queryInput: TicketQueryInput): Observable<TicketQueryOutput[]> {
    return this.httpService.post(ApiEndpoint.TICKETS + apiPath, queryInput);
  }
}
