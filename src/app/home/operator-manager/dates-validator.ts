import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class DatesValidator {

  constructor() {
  }

  static validStartDate(control: FormControl) {
    let valid: any;
    valid = null;
    let diff: any;
    diff = new Date(control.value).valueOf() - new Date('1999-01-01').valueOf();
    if (diff >= 0) {
      valid = true;
    }
    return valid ? null : {validStartDate: true};

  }

  static validEndDate(control: FormControl) {
    let valid: any;
    valid = null;
    let diff: any;
    const valueDateControl = new Date(control.value).valueOf();
    diff = new Date().valueOf() - valueDateControl;
    console.log('new Date(control.value).valueOf()', new Date(control.value).valueOf());
    if (isNaN(valueDateControl) || diff > 3600 * 24) {
      valid = true;
    }
    return valid ? null : {validEndDate: true};
  }
}
