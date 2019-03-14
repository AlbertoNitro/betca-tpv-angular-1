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
  WarningPassword = false;
  constructor() { }

  ngOnInit() {
  }
  guardar() {}

  comparatePassword() {
    if (this.passwordNew !== this.NewRepeatpassword) {
      this.WarningPassword = true;
    }
  }
  closeWarningPasword() {
    this.WarningPassword = false;
  }

}
