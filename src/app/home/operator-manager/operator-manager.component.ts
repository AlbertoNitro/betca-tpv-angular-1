import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.operatorManagerForm = this.fb.group({
      dateFrom: [],
      dateUp: [],
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
