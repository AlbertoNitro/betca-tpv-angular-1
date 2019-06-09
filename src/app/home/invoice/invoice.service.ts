import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from "../shared/api-endpoint.model";

@Injectable()
export class InvoiceService {
  constructor(private httpService: HttpService) {
  }

  generateInvoice(ticketReference: string): Observable<any> {
    return this.httpService.pdf().get(ApiEndpoint.INVOICE + ApiEndpoint.INVOICEGENERATE + '/' + ticketReference);
  }
}
