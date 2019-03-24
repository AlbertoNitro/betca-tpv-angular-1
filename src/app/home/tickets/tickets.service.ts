import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Ticket} from './models/ticket.model';
import {ShoppingTicket} from './models/shopping-ticket.model';
import {ShoppingState} from './models/shopping-state.enum';



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
      code: code,
      date: '05/03/2019 17:15:55',
      shoppingTicket: this.shoppingTicketMock ,
      total: 106
    };
     return this.ticketMock;
    // TODO: API CALL and returning an Observable<Ticket>
    // return this.httpService.get(ApiEndpoint.TICKETS + '/' + code);
  }

  createNewTicket(ticket: Ticket) {
    console.log('Saving a new Ticket!', ticket);
    // TODO: API CALL and returning an Observable<Ticket>
    // return this.httpService.post(ApiEndpoint.TICKETS, ticket);
  }
}
