import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Clock} from './clock';

import {CLOCKS} from './clock-mock';
import {DatesValidator} from './dates-validator';

@Component({
  selector: 'app-operator-manager',
  templateUrl: './operator-manager.component.html',
  styleUrls: ['./operator-manager.component.css']
})
export class OperatorManagerComponent implements OnInit {
  static URL = 'operator-manager';
  operatorManagerForm: FormGroup;
  dateFrom: Date;
  dateUp: Date;
  employeeMobile: number;
  title = 'Operator, Manager Clock in/out';
  columns = ['employee', 'date', 'in', 'out', 'total'];
  clocks: Clock[];
  public hasError = (controlName: string, errorName: string) => {
    return this.operatorManagerForm.controls[controlName].hasError(errorName);
  };

  constructor(private fb: FormBuilder) {
    this.clocks = CLOCKS;
  }

  ngOnInit() {
    this.operatorManagerForm = this.fb.group({
      dateFrom: ['', DatesValidator.validEndDate],
      dateUp: ['', DatesValidator.validEndDate],
      employeeMobile: ['', Validators.maxLength(9)]
    });
  }

  dateFromChange(date) {
    console.log('onChange dateFrom');
    this.dateFrom = date.value;
  }

  dateUpChange(date) {
    console.log('onChange dateUp');
    this.dateUp = date.value;
  }

  search() {
    // TODO Implements search
    console.log('onSubmit search');
  }
}
