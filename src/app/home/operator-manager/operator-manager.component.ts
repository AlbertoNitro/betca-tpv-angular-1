import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Clock} from './models/clock';
import {DatesValidator} from './dates-validator';
import {OperatorManagerService} from './operator-manager.service';
import {OperatorManagerInput} from './models/operator-manager-input.model';

@Component({
  selector: 'app-operator-manager',
  templateUrl: './operator-manager.component.html',
  styleUrls: ['./operator-manager.component.css']
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
      dateFrom: this.formFields.dateFrom.value,
      dateTo: this.formFields.dateTo.value,
      employeeMobile: this.formFields.employeeMobile.value
    };
    this.operatorManagerService.readAllClocksWithDateFromAndDateUpAndEmployeeMobile(operatorManagerInput).subscribe(
      clocksOutput => {
        this.clocksData = clocksOutput;
        console.dir(this.clocksData);
      });
  }
}
