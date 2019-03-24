import {Component} from '@angular/core';

import {UserService} from './user.service';
import {User} from './user.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserCreateUpdateDialogComponent} from './user-create-update-dialog/user-create-update-dialog.component';

@Component({
  templateUrl: `users.component.html`
})
export class UsersComponent {
  static URL = 'users';

  user: User;
  onlyCustomer = true;

  title = 'Users management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.user = {mobile: null, username: null};
    this.data = null;
  }

  search() {
    // TODO implement search with fields
    this.userService.readAll().subscribe(
      data => this.data = data
    );
  }

  resetSearch() {
    this.user = {mobile: null, username: null};
  }


  create() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Create',
        user: {mobile: null, username: null}
      }
    };
    this.dialog.open(UserCreateUpdateDialogComponent, dialogConfig);
  }

  read(user: User) {
    // TODO
  }

  update(user: User) {
    this.userService.findByMobile(user.mobile).subscribe(response => {
      const dialogConfig: MatDialogConfig = {
        data: {
          mode: 'Update',
          user: response
        }
      };
      this.dialog.open(UserCreateUpdateDialogComponent, dialogConfig);
    }, error => {
      console.log(error);
    });
  }

  delete(user: User) {
    // TODO
  }

}
