import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfile',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class ProfileDialogComponent implements OnInit {
  passwordCurrent: string ;
  passwordNew: string;
  NewRepeatpassword: string;
  constructor() { }

  ngOnInit() {
  }
  guardar(){}
}
