import {Component, Inject, OnInit} from '@angular/core';
import {TokensService} from '../../core/tokens.service';
import {User} from './user.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {UserService} from './user.service';
import {Role} from '../../core/role.model';
import {UserRoles} from './user-roles.model';

@Component({
  selector: 'app-perfile',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class RolesDialogComponent implements OnInit {
  adminIs = true;
  operatorIs = false;
  user: User;
  userRole: UserRoles = {mobile: null, roles: null};
  rolesUser: String[];
  rolesList: { admin: boolean; manager: boolean; operator: boolean; customer: boolean };

  rolesListName;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private tokensService: TokensService, private userService: UserService ) {
    this.user = data.user;
    this.userRole.mobile = this.user.mobile;

    this.rolesUser = this.user.roles;
    this.rolesList = { admin: false, manager: false, operator: false, customer: false};
    this.rolesListName = [];
  }

  ngOnInit() {
     if (this.tokensService.isAdmin()) {
      this.operatorIs = false;
    } else if (this.tokensService.isManager()) {
      this.adminIs = false;
    } else {
      this.operatorIs = true;
    }
    for (const role of this.rolesUser) {
      if (role == Role.ADMIN) {
        this.rolesList.admin = true;
      } else if (role == Role.MANAGER) {
        this.rolesList.manager = true;
      } else if (role == Role.OPERATOR) {
        this.rolesList.operator = true;
      } else if (role == Role.CUSTOMER) {
        this.rolesList.customer = true;
      }

    }
  }
  guardar() {
    if (this.rolesList.admin == true) {
      this.rolesListName.push(Role.ADMIN);
    }
    if (this.rolesList.manager == true) {
      this.rolesListName.push(Role.MANAGER);
    }
    if (this.rolesList.operator == true) {
      this.rolesListName.push(Role.OPERATOR);
    }
    if (this.rolesList.customer == true) {
      this.rolesListName.push(Role.CUSTOMER);
    }

    this.userRole.roles = this.rolesListName;
    this.userService.updateRoles(this.userRole).subscribe(users => this.data = users);
  }
}
