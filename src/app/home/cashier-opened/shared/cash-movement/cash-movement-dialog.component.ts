import {Component} from '@angular/core';
import {CashMovement} from './cash-movement.model';
import {CashMovementOptionsModel} from './cash-movement-options.model';
import {CashMovementService} from './cash-movement.service';
import {MatSnackBar} from '@angular/material';
import {OptionType} from './cash-movement-option-type.model';
import {TokensService} from '../../../../core/tokens.service';

@Component({
  templateUrl: 'cash-movement-dialog.component.html',
  styleUrls: ['cash-movement-dialog.component.css']
})
export class CashMovementDialogComponent {

  cashMovement: CashMovement = {cash: undefined, comment: undefined};
  cashMovementOptions: CashMovementOptionsModel[] = [
    {value: OptionType.DEPOSIT, viewValue: OptionType.DEPOSIT},
    {value: OptionType.WITHDRAWAL, viewValue: OptionType.WITHDRAWAL}
  ];
  fieldsDisabled: boolean;
  selectedValue: string;
  username: string;

  constructor(
    private cashMovementService: CashMovementService,
    private snackBar: MatSnackBar,
    private tokensService: TokensService
  ) {
    this.fieldsDisabled = true;
    this.username = tokensService.getName();
  }

  invalid() {
    return (!this.cashMovement.cash || this.cashMovement.cash <= 0
      || !this.cashMovement.comment
      || this.fieldsDisabled
    );
  }

  onChange($event: string) {
    this.fieldsDisabled = false;
    this.selectedValue = $event;
  }

  save() {
    if (this.selectedValue === OptionType.WITHDRAWAL) {
      this.cashMovementService.withdrawal(this.cashMovement).subscribe(
        response => {
          this.snackBar.open('Successful operation', '', {
            duration: 2000
          });
        },
        err => {
          this.snackBar.open('Error in operation', 'Error', {
            duration: 2000
          });
        }
      );
    } else if (this.selectedValue === OptionType.DEPOSIT) {
      this.cashMovement.comment = this.username + '-' + this.cashMovement.comment;
      this.cashMovementService.deposit(this.cashMovement).subscribe(
        response => {
          this.snackBar.open('Successful operation', '', {
            duration: 2000
          });
        },
        err => {
          this.snackBar.open('Error in operation', 'Error', {
            duration: 2000
          });
        }
      );
    }
  }
}
