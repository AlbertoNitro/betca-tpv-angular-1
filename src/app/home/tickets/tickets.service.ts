import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Ticket} from './models/ticket.model';
import {ShoppingTicket} from './models/shopping-ticket.model';
import {ShoppingState} from './models/shopping-state.enum';
import {TicketQueryOutput} from './models/ticket-query-output.model';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {TicketQueryInput} from './models/ticket-query-input.model';



@Injectable()
export class TicketsService {
  shoppingTicketMock: ShoppingTicket[];
  ticketMock: Ticket;
  constructor(private httpService: HttpService) {
  }

  readOne(code: string): Ticket {
    console.log('Searching Ticket with id: ', code);
    this.shoppingTicketMock = [
      {
        description: 'Blue Jeans',
        amount: 5,
        discount: 0,
        retailPrice: 20,
        shoppingState: ShoppingState.InStock,
        totalPrice: 100,
      },
      {
        description: 'Hat',
        amount: 2,
        discount: 0,
        retailPrice: 3,
        shoppingState: ShoppingState.NotCommited,
        totalPrice: 6,
      }
    ] ;
     this.ticketMock = {
       id: '112287',
       shoppingTicket: this.shoppingTicketMock
    };
     return this.ticketMock;
    // TODO: API CALL and returning an Observable<Ticket>
    // return this.httpService.get(ApiEndpoint.TICKETS + '/' + id);
  }

  updateTicket(ticket: Ticket) {
    console.log('Saving a new Ticket!', ticket);
    // TODO: API CALL and returning an Observable<Ticket>
    // return this.httpService.put(ApiEndpoint.TICKETS + '/' + id, ticket);
  }

  read(id: string): Observable<Ticket> {
    return this.httpService.get(ApiEndpoint.TICKETS + '/' + id);
  }

  advancedTicketQuery(apiPath: string, queryInput: TicketQueryInput): Observable<TicketQueryOutput[]> {
    return this.httpService.post(ApiEndpoint.TICKETS + apiPath, queryInput);
  }
}
