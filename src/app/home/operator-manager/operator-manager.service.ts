import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Clock} from './models/clock';
import {CLOCKS} from './models/clock-mock';
import {OperatorManagerInput} from './models/operator-manager-input.model';
import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorManagerService {
  clocksMock: Clock[];
  private _operatorManagerInput: OperatorManagerInput;
  private KEY_PARAM_DATE_FROM = 'dateFromMs';
  private KEY_PARAM_DATE_TO = 'dateToMs';
  private KEY_PARAM_MOBILE = 'mobile';


  constructor(private httpService: HttpService) {
    this.clocksMock = CLOCKS;
  }

  /*
    readAllClocksWithDateFromAndDateUpAndEmployeeMobile(operatorManagerInput: OperatorManagerInput): Observable<Clock[]> {
      console.log('call readAllClocksWithDateFromAndDateUpAndEmployeeMobile');
      // TODO implements for API REST  Get/Clocks
      this._operatorManagerInput = operatorManagerInput;
      console.log(this._operatorManagerInput.dateFrom);
      console.log(this._operatorManagerInput.dateTo);
      console.log(this._operatorManagerInput.employeeMobile);
      console.dir(this.clocksMock);
      return of(this.clocksMock);
    }
  */

  search(operatorManagerInput: OperatorManagerInput): Observable<Clock[]> {
     this._operatorManagerInput = operatorManagerInput;
      return this.httpService.param(this.KEY_PARAM_DATE_FROM, '' + this._operatorManagerInput.dateFrom)
       .param(this.KEY_PARAM_DATE_TO, '' + this._operatorManagerInput.dateTo)
       .param(this.KEY_PARAM_MOBILE, this._operatorManagerInput.employeeMobile)
       .get(ApiEndpoint.OPERATOR_MANAGER + ApiEndpoint.SEARCH);
   }

}
