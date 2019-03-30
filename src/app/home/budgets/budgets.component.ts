import {Component} from '@angular/core';

import {Budget} from './budgets.model';
import {BudgetService} from './budget.service';

@Component({
  templateUrl: 'budgets.component.html'
})
export class BudgetsComponent {
  static URL = 'budgets';

  budget: {id: null};

  data: Budget[];
  title = 'Budget management';
  columns = ['id'];

  constructor(private budgetService: BudgetService) {
    this.budget = {id: null};
  }

  search(id: string) {
    if (id) {
      this.budgetService.readById(id).subscribe(
        data => this.data = [data]
      );
    } else {
      this.budgetService.readAll().subscribe(
        data => this.data = data
      );
    }
  }

  resetSearch() {
    this.budget = {id: null};
  }

}
