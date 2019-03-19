import {Component} from '@angular/core';

import {Budget} from './budgets.model';

@Component({
  templateUrl: 'budgets.component.html'
})
export class BudgetsComponent {
  static URL = 'budgets';

  budget: {code: null};

  data: Budget[];
  title = 'Budget management';
  columns = ['code'];

  constructor() {
    this.budget = {code: null};
  }

  search() {
    // TODO implement real search
    this.data = [
      {'code': '11111111', 'shoppingCart': []}, {'code': '22222222', 'shoppingCart': []},
      {'code': '33333333', 'shoppingCart': []}, {'code': '44444444', 'shoppingCart': []}
    ];
  }

  resetSearch() {
    this.budget = {code: null};
  }

}
