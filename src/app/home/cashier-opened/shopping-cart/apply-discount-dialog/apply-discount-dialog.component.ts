import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MobileData} from '../shopping-cart.component';
import {User} from '../../../users/user.model';
import {UserService} from '../../../users/user.service';
import {Provider} from '../../../providers/provider.model';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-apply-discount-dialog',
  templateUrl: './apply-discount-dialog.component.html',
  styleUrls: ['./apply-discount-dialog.component.css']
})
export class ApplyDiscountDialogComponent implements OnInit {
  user: User;
  provider: Provider = {};
  providers: [UserService, HttpClient];


  constructor(private userService: UserService,
              private shoppingCartService: ShoppingCartService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<ApplyDiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MobileData ) { }

              ngOnInit() {
    this.findDiscountByMobile();
              }
              findDiscountByMobile(): void {
    this.userService.findByMobile(<number><any>this.data.mobile).subscribe(respuesta => {
      console.log(respuesta);
      this.user = respuesta;
    });
  }

  apply() {
    this.shoppingCartService.updateUserDiscount(this.user.discount);
  }
}
