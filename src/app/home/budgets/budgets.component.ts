import {Component} from '@angular/core';

import {Budget} from './budgets.model';
import {BudgetService} from './budget.service';
import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';
import {Router} from '@angular/router';
import {CashierOpenedComponent} from '../cashier-opened/cashier-opened.component';
import {HomeComponent} from '../home.component';

@Component({
  templateUrl: 'budgets.component.html'
})
export class BudgetsComponent {
  static URL = 'budgets';

  budget: {id: null};

  data: Budget[];
  title = 'Budget management';
  columns = ['id'];

  constructor(private router: Router, private budgetService: BudgetService) {
    this.budget = {id: null};
  }

  delete(id: string) {
    this.budgetService.delete(id).subscribe(
      () => {
        this.budgetService.readAll().subscribe(
          data => {
            this.data = data;
            this.resetSearch();
          }
        );
      }
    );
  }

  fillShoppingCart(shoppingCart: Shopping[]) {
    this.budgetService.fillShoppingCart(shoppingCart);
    this.router.navigate([HomeComponent.URL, CashierOpenedComponent.URL]);
  }

  generatePdf(id: string) {
    this.budgetService.generatePdf(id).subscribe();
  }

  resetSearch() {
    this.budget = {id: null};
  }

  search(id: string) {
    if (id) {
      this.budgetService.readById(id).subscribe(
        data => {
          if (data.id && data.id) {
            this.data = [data];
          } else {
            this.data = [];
          }
        }
      );
    } else {
      this.budgetService.readAll().subscribe(
        data => this.data = data
      );
    }
  }
}
