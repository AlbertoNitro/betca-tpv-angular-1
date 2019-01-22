import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {TicketCreation} from './ticket-creation.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class TicketService {
  static END_POINT = '/tickets';

  constructor(private httpService: HttpService) {
  }

  create(ticketCreation: TicketCreation): Observable<any> {
    return this.httpService.bearerAuth().pdf().post(TicketService.END_POINT, ticketCreation);
  }

}
