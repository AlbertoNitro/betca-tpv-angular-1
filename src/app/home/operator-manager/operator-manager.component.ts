import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Clock} from './models/clock';
import {DatesValidator} from './dates-validator';
import {OperatorManagerService} from './operator-manager.service';
import {OperatorManagerInput} from './models/operator-manager-input.model';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-operator-manager',
  templateUrl: './operator-manager.component.html',
  styleUrls: ['./operator-manager.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class OperatorManagerComponent implements OnInit {
  static URL = 'operator-manager';
  operatorManagerForm: FormGroup;
  dateFrom: Date;
  dateTo: Date;
  clocksData: Clock[];
  employeeMobile: number;
  title = 'Operator, Manager Clock in/out';
  columns = ['employee', 'date', 'in', 'out', 'total'];

  constructor(private fb: FormBuilder, private operatorManagerService: OperatorManagerService) {
  }

  get formFields() {
    return this.operatorManagerForm.controls;
  }

  hasError(controlName: string, errorName: string) {
    return this.operatorManagerForm.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    this.operatorManagerForm = this.fb.group({
      dateFrom: ['', DatesValidator.validEndDate],
      dateTo: ['', DatesValidator.validEndDate],
      employeeMobile: ['', Validators.maxLength(9)]
    });
  }

  doSearch() {
    console.log('onSubmit search');
    const operatorManagerInput: OperatorManagerInput = {
      dateFrom: this.formFields.dateFrom.value === '' ? 0 : new Date(this.formFields.dateFrom.value).getTime(),
      dateTo: this.formFields.dateTo.value === '' ? 0 : new Date(this.formFields.dateTo.value).getTime(),
      employeeMobile: this.formFields.employeeMobile.value === '' ? null : this.formFields.employeeMobile.value
    };
    this.operatorManagerService.search(operatorManagerInput).subscribe(
      clocksOutput => {
        this.clocksData = clocksOutput;
        console.dir(this.clocksData);
      });
  }
}
