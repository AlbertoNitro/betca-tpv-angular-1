import { Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {InvoiceUpdateModel} from '../shared/invoice-update.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {before} from 'selenium-webdriver/testing';

@Injectable()
export class InvoiceUpdateService {
  constructor(private httpService: HttpService) {
  }
  getInvoicesByMobile(mobile: string): Observable<InvoiceUpdateModel[]> {
    return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + mobile);
  }
  getInvoicesByAfterDate(afterDate: string) {
    const dateUntil = new Date();
    const day = dateUntil.getDate();
    const month = dateUntil.getMonth() + 1;
    const year = dateUntil.getFullYear();
    const beforeDate = year.toString() + (month < 10 ? '0' + month.toString() : month.toString()) + (day < 10 ? '0' +
      day.toString() : day.toString());
    return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + afterDate + '/' + beforeDate);
  }
  getInvoicesByBetweenDates(afterDate: string, beforeDate: string) {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + afterDate + '/' + beforeDate);
  }
  getInvoicesByMobileAndBetweenDate(mobile: string, afterDate: string, beforeDate: string) {
      return this.httpService.get(ApiEndpoint.INVOICEUPDATE + '/' + mobile + '/' +
        afterDate + '/' + beforeDate);
    }
}
