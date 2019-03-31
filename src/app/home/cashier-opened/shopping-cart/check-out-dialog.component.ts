import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';

import {TicketCreation} from './ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';
import {UserQuickCreationDialogComponent} from './user-quick-creation-dialog/user-quick-creation-dialog.controller';
import {VouchersUseDialogComponent} from '../../vouchers/vouchersUse-dialog.component';
import {User} from '../../users/user.model';
import {UserCreateUpdateDialogComponent} from '../../users/user-create-update-dialog/user-create-update-dialog.component';
import {UserService} from '../../users/user.service';
import {VoucherService} from '../../shared/voucher.service';

@Component({
  templateUrl: 'check-out-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class CheckOutDialogComponent {

  totalPurchase: number;
  requestedInvoice = false;
  ticketCreation: TicketCreation;
  userFound: User;
  userMobile: number;
  codeVoucher: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
              private userService: UserService, private voucherService: VoucherService, private snackBar: MatSnackBar) {
    this.totalPurchase = data.total;
    this.ticketCreation = data.ticketCreation;
    this.userService = userService;

  }

  static format(value: number): number {
    return value ? value : 0; // empty string,NaN,false,undefined,null,0 is: false
  }

  uncommitted() {
    return this.shoppingCartService.uncommitArticlesExist();
  }

  totalCommitted() {
    return this.shoppingCartService.getTotalCommitted();
  }

  warning(): boolean {
    return (!this.ticketCreation.userMobile) && this.shoppingCartService.uncommitArticlesExist();
  }

  returnedAmount(): number {
    return Math.round(
      (CheckOutDialogComponent.format(this.ticketCreation.cash)
        + CheckOutDialogComponent.format(this.ticketCreation.card)
        + CheckOutDialogComponent.format(this.ticketCreation.voucher)
        - this.totalPurchase) * 100
    ) / 100;
  }

  returnedCash(): number {
    if (this.ticketCreation.cash >= this.returnedAmount()) {
      return this.returnedAmount();
    } else {
      return this.ticketCreation.cash;
    }
  }

  fillCard() {
    if (this.returnedAmount() < 0) {
      this.ticketCreation.card = -this.returnedAmount();
    } else {
      this.ticketCreation.card = this.totalPurchase;
      this.ticketCreation.cash = 0;
    }
  }

  fillCash() {
    this.ticketCreation.cash = CheckOutDialogComponent.format(this.ticketCreation.cash);
    if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
      this.ticketCreation.cash = -this.returnedAmount();
    } else if (this.ticketCreation.cash < 20) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
    } else if (this.ticketCreation.cash < 50) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
    } else {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
    }
  }

  consumeVoucher() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Update',
        voucher: {id: this.ticketCreation.voucher},
        value: 0,
        width: '60%',
        height: '90%'
      }
    };
    this.dialog.open(VouchersUseDialogComponent, dialogConfig).afterClosed().subscribe(
      data => {
        if (data !== '' && data.dateOfUse == null) {
          this.ticketCreation.voucher = data.value;
          this.codeVoucher = data.id;
        } else {
          this.snackBar.open('The voucher is not valid', '', {
            duration: 5000
          });
        }

      },
      error => {
        this.ticketCreation.voucher = 0;
        console.log(error);
      });
  }


  invalidCheckOut(): boolean {
    return (this.totalPurchase + this.returnedAmount() - this.shoppingCartService.getTotalCommitted() < -0.01); // rounding errors
  }

  checkOut() {
    const returned = this.returnedAmount();
    const cash = this.ticketCreation.cash;
    let voucher = 0;
    this.ticketCreation.cash = CheckOutDialogComponent.format(this.ticketCreation.cash);
    this.ticketCreation.card = CheckOutDialogComponent.format(this.ticketCreation.card);
    this.ticketCreation.voucher = CheckOutDialogComponent.format(this.ticketCreation.voucher);
    if (returned > 0) {
      this.ticketCreation.cash -= returned;
    }
    if (this.ticketCreation.cash < 0) {
      voucher = -this.ticketCreation.cash;
      this.ticketCreation.cash = 0;
    }

    this.ticketCreation.note = '';
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.note += ' Pay with card: ' + Math.round(this.ticketCreation.card * 100) / 100 + '.';
    }
    if (this.ticketCreation.voucher > 0) {
      this.ticketCreation.note += ' Pay with voucher: ' + Math.round(this.ticketCreation.voucher * 100) / 100 + '.';
    }
    if (this.ticketCreation.cash > 0) {
      this.ticketCreation.note += ' Pay with cash: ' + Math.round(cash * 100) / 100 + '.';
    }
    if (returned > 0) {
      this.ticketCreation.note += ' Return: ' + Math.round(returned * 100) / 100 + '.';
    }
    this.shoppingCartService.checkOut(this.ticketCreation).subscribe(() => {
      if (voucher > 0) {
        // TODO crear un vale como parte del pago, luego crear la factura
        this.createInvoice();
      } else {
        this.createInvoice();
      }

      this.voucherService.update(this.codeVoucher);

    });
  }

  createInvoice() {
    if (this.requestedInvoice) {
      // TODO crear una factura
    } else {
      this.dialog.closeAll();
    }
  }

  invalidInvoice(): boolean {
    // TODO pendiente de calcular. Hace falta tener al usuario totalmente completado
    return true;
  }

  findUserByMobile() {
    this.userService.findByMobile(this.userMobile).subscribe(response => {
      this.assignUserToTicket(response);
    }, () => {
      const dialogConfig: MatDialogConfig = {
        data: {
          mobile: this.userMobile
        }
      };
      this.openQuickUserCrud(dialogConfig);
    });
  }

  openQuickUserCrud(dialogConfig: MatDialogConfig) {
    const quickUserCrudDialog = this.dialog.open(UserQuickCreationDialogComponent, dialogConfig);
    quickUserCrudDialog.afterClosed().subscribe(userCreated => {
      if (userCreated !== '') {
        this.assignUserToTicket(userCreated);
      }
    });
  }


  openEditUserDialog() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Update',
        user: this.userFound
      }
    };
    const editUserDialog = this.dialog.open(UserCreateUpdateDialogComponent, dialogConfig);
    editUserDialog.afterClosed().subscribe(userUpdated => {
      if (userUpdated !== '') {
        this.assignUserToTicket(userUpdated);
      }
    });
  }

  assignUserToTicket(user) {
    this.ticketCreation.userMobile = user.mobile;
    this.userMobile = user.mobile;
    this.userFound = user;
  }

  unassignUserToTicket() {
    this.ticketCreation.userMobile = null;
    this.userMobile = null;
    this.userFound = null;
  }
}
