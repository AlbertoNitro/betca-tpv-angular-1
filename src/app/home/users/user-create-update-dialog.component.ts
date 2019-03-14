import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {User} from './user.model';
import {RolesDialogComponent} from './roles-dialog.component';

@Component({
  templateUrl: 'user-create-update-dialog.component.html',
  styleUrls: ['users.component.css']
})

export class UserCreateUpdateDialogComponent implements OnInit {
  user: User;
  modeDialog: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.user = data.user;
    this.modeDialog = data.mode;
  }

  ngOnInit() {
  }

  edit() {
    return null;
  }

  openEditRolesDialog() {
    this.dialog.open(RolesDialogComponent);
  }
}
