import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OperatorManagerInput} from './models/operator-manager-input.model';
import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {OperatorManagerOutput} from './models/operator-manager-output.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorManagerService {
  private _operatorManagerInput: OperatorManagerInput;
  private KEY_PARAM_DATE_FROM = 'dateFromMs';
  private KEY_PARAM_DATE_TO = 'dateToMs';
  private KEY_PARAM_MOBILE = 'mobile';

  constructor(private httpService: HttpService) {
  }

  search(operatorManagerInput: OperatorManagerInput): Observable<OperatorManagerOutput[]> {
    this._operatorManagerInput = operatorManagerInput;
    let paramPath = '';
    if (!isNaN(new Date(this._operatorManagerInput.dateFrom).getTime()) && new Date(this._operatorManagerInput.dateFrom).getTime() !== 0) {
      paramPath = paramPath + '&' + this.KEY_PARAM_DATE_FROM + '=' + new Date(this._operatorManagerInput.dateFrom).getTime();
    }
    if (!isNaN(new Date(this._operatorManagerInput.dateTo).getTime()) && new Date(this._operatorManagerInput.dateTo).getTime() !== 0) {
      paramPath = paramPath + '&' + this.KEY_PARAM_DATE_TO + '=' + new Date(this._operatorManagerInput.dateTo).getTime();
    }
    if (this._operatorManagerInput.employeeMobile !== '' && this._operatorManagerInput.employeeMobile !== null) {
      paramPath = paramPath + '&' + this.KEY_PARAM_MOBILE + '=' + String(this._operatorManagerInput.employeeMobile);
    }
    console.log('API = ' + ApiEndpoint.OPERATOR_MANAGER + ApiEndpoint.SEARCH + '?' + paramPath);
    return this.httpService.get(ApiEndpoint.OPERATOR_MANAGER + ApiEndpoint.SEARCH + '?' + paramPath);
  }

  updateDateTimeLogout(): Observable<any> {
    let paramPath = '';
    if (this.httpService.getToken() !== undefined) {
      paramPath = paramPath + '?&mobile=' + this.httpService.getToken().mobile;
      console.log(paramPath);
    }
    return this.httpService.get(ApiEndpoint.USERS + '/logout' + paramPath);
  }
}
