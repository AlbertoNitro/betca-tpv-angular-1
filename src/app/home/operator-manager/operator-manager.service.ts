import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Clock} from './models/clock';
import {CLOCKS} from './models/clock-mock';
import {OperatorManagerInput} from './models/operator-manager-input.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorManagerService {
  clocksMock: Clock[];
  private _operatorManagerInput: OperatorManagerInput;


  constructor() {
    this.clocksMock = CLOCKS;
  }

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
}
