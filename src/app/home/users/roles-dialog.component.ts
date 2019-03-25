import {Component, Inject, OnInit} from '@angular/core';
import {TokensService} from '../../core/tokens.service';
import {User} from './user.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ProviderService} from '../providers/provider.service';
import {UserService} from './user.service';
import {Role} from '../../core/role.model';
import {UserRolesModel} from './user-roles.model';

@Component({
  selector: 'app-perfile',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class RolesDialogComponent implements OnInit {
  adminIs = true;
  operatorIs = false;
  user: User;
  Manager = true;
  userRole: UserRolesModel;
  rolesUser: String[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private tokensService: TokensService, private userService: UserService ) {
    this.user = data.user;
    this.userRole = this.user;
    console.log(this.user.username);
    console.log(this.user.role.length);
  }

  ngOnInit() {
     if (this.tokensService.isAdmin()) {
      this.operatorIs = false;
      console.log('admin');
    } else if (this.tokensService.isManager()) {
      this.adminIs = false;
      console.log('"manager');
    } else {
      console.log('operator');
      this.operatorIs = true;
    }
    console.log(this.user.role.length);
  }
  guardar() {
   // this.userRole.role = ['ADMIN'];
    this.userService.updateRoles(this.userRole).subscribe();
  }
}
