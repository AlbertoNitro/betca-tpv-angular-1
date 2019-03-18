import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {User} from '../user.model';
import {RolesDialogComponent} from '../roles-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'user-create-update-dialog.component.html',
  styleUrls: ['user-create-update-dialog.component.css']
})

export class UserCreateUpdateDialogComponent implements OnInit {
  user: User;
  modeDialog: string;
  userForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.user = data.user;
    this.modeDialog = data.mode;
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      mobile: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern('[^ @]*@[^ @]*')),
      dni: new FormControl('', Validators.pattern('^[0-9]{8,8}[A-Za-z]')),
      address: new FormControl(''),
      registrationDate: new FormControl(''),
      active: new FormControl('')
    });
  }

  saveUser() {
    // TODO save user
    console.log('Usuario', this.userForm.value);
  }

  openEditRolesDialog() {
    this.dialog.open(RolesDialogComponent);
  }
}
