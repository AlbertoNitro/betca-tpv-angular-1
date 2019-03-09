import {Component} from '@angular/core';
import {CashMovement} from './cash-movement.model';

export interface CashMovementOptions {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: 'cash-movement-dialog.component.html',
  styleUrls: ['cash-movement-dialog.component.css']
})
export class CashMovementDialogComponent {

  cashMovement: CashMovement = {import: undefined, comment: undefined};
  cashMovementOptions: CashMovementOptions[] = [
    {value: 'Deposit', viewValue: 'Deposit'},
    {value: 'Withdrawal', viewValue: 'Withdrawal'}
  ];
  fieldsDisabled: boolean;
  selectedValue: string;

  constructor() {
        this.fieldsDisabled = true;
      }

  invalid() {
    return (!this.cashMovement.import || this.cashMovement.import <= 0
      || !this.cashMovement.comment
      || this.fieldsDisabled
    );
  }

  onChange($event: {}) {
    this.fieldsDisabled = false;
  }

  save() {
  }
}
