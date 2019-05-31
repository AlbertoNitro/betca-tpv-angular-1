import { Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {InvoiceUpdateModel} from '../shared/invoice-update.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class InvoiceUpdateService {
  constructor(private httpService: HttpService) {
  }
  getInvoicesByMobile(mobile: string): Observable<InvoiceUpdateModel[]> {
    return this.httpService.get(ApiEndpoint.INVOICEUPDATEMOBILE + '/' + mobile);
  }
  getInvoicesByAfterDate(afterDate: string) {
    const dateUntil = new Date();
    const day = dateUntil.getDate();
    const month = dateUntil.getMonth() + 1;
    const year = dateUntil.getFullYear();
    const beforeDate = year.toString() + (month < 10 ? '0' + month.toString() : month.toString()) + (day < 10 ? '0' +
      day.toString() : day.toString());
    return this.httpService.get(ApiEndpoint.INVOICEUPDATEDATES + '/' + afterDate + '/' + beforeDate);
  }
  getInvoicesByBetweenDates(afterDate: string, beforeDate: string) {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATEDATES + '/' + afterDate + '/' + beforeDate);
  }
  getInvoicesByMobileAndBetweenDate(mobile: string, afterDate: string, beforeDate: string) {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATEDATES + '/' + mobile + '/' +
        afterDate + '/' + beforeDate);
    }
  generatePdf(id: string): Observable<any> {
    return this.httpService.pdf().get(ApiEndpoint.INVOICEUPDATEPDF + '/' + id);
  }
  look4PosibleTotal(id: string): Observable<number> {
    return this.httpService.get(ApiEndpoint.INVOICEUPDATENEGATIVEMAX + '/' + id);
  }
  generateNegative(negativeInvoice: InvoiceUpdateModel): Observable<InvoiceUpdateModel> {
    return this.httpService.successful('The negative invoice was created')
      .post(ApiEndpoint.INVOICECREATENEGATIVE, negativeInvoice);
  }
}
