import { Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {InvoiceUpdateModel} from '../shared/invoice-update.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class InvoiceUpdateService {
  constructor(private httpService: HttpService) {
  }
  getInvoices(mobile: string, dateFrom: string, dateTo: string): Observable<InvoiceUpdateModel[]> {
    if (mobile === '' && dateFrom !== '' && dateTo !== '') {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + dateFrom + '/' + dateTo);
    } else if (mobile !== '' && dateFrom === '' &&  dateTo === '') {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + mobile );
    } else if (mobile !== '' && dateFrom !== '' && dateTo !== '') {
   //   return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + mobile + '/' + dateFrom + '/' + dateTo);
        return this.httpService.get(ApiEndpoint.INVOICEUPDATE);
    }
  }
}
