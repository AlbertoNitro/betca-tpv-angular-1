import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {User} from '../user.model';
import {RolesDialogComponent} from '../roles-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';

@Component({
  templateUrl: 'user-create-update-dialog.component.html',
  styleUrls: ['user-create-update-dialog.component.css']
})

export class UserCreateUpdateDialogComponent implements OnInit {
  user: User;
  modeDialog: string;
  userForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private userService: UserService,
              public dialogRef: MatDialogRef<UserCreateUpdateDialogComponent>) {
    this.user = data.user;
    this.modeDialog = data.mode;
    this.userService = userService;
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      mobile: new FormControl(this.user.mobile, [Validators.required, Validators.pattern('[0-9]{9}')]),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.pattern('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')),
      dni: new FormControl(this.user.dni),
      address: new FormControl(this.user.address),
      registrationDate: new FormControl(this.user.registrationDate),
      active: new FormControl(this.user.active)
    });
  }

  createUpdateUser() {
    if (this.modeDialog === 'Update') {
      this.userService.updateUser(this.userForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    } else {
        this.userService.saveUser(this.userForm.value).subscribe(response => {
          this.dialogRef.close();
        });
    }
  }

  openEditRolesDialog() {
    this.userService.findByMobile(this.user.mobile).subscribe(response => {
        const dialogConfig: MatDialogConfig = {
          data: {
            mode: 'Update',
            user: response
          }
        };
        this.dialog.open(RolesDialogComponent, dialogConfig);
      });
    }
}
