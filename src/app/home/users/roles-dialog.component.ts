import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-perfile',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class RolesDialogComponent implements OnInit {
  manager = true;
  admin = true;
  operator = true;
  customer = true;

  constructor() {
  }

  ngOnInit() {
  }

  guardar() {
  }
}
