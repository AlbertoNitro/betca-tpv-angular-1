import {Component} from '@angular/core';

import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';

@Component({
  templateUrl: `users.component.html`
})
export class UsersComponent {
  static URL = 'customers';

  user: User;

  title = 'Users management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private userService: UserService) {
    this.user = {mobile: null, username: null};
    this.data = null;
  }

  search() {
    this.userService.readAll().subscribe(
      data => this.data = data
    );
  }

  resetSearch() {
    this.user = {mobile: null, username: null};
  }


  create() {
  }

  read(user: User) {
  }

  update(user: User) {
  }

  delete(user: User) {
  }

}
