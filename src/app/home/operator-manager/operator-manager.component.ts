import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Offer} from '../offers/offer.model';
import {Clock} from './clock';
import {OFFERS} from '../offers/offers.mock';
import {CLOCKS} from './clock-mock';

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
  columns = ['employee', 'date', 'clock in', 'clock out', 'total'];
  clocks: Clock[];

  constructor(private fb: FormBuilder) {
    this.clocks = CLOCKS;
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
