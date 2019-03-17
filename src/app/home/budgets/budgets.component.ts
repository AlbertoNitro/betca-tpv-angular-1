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
  columns = ['Code'];

  constructor() {
    this.budget = {code: null};
  }

  search() {
    // TODO implement search
  }

  resetSearch() {
    this.budget = {code: null};
  }

}
