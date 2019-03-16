import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfile',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class ProfileDialogComponent implements OnInit {
  passwordCurrent: string ;
  passwordNew: string;
  NewRepeatpassword: string;
  WarningPasswordNews = false;
  WarningPasswordCurrentNew = false;
  constructor() { }

  public userForm: FormGroup;

  ngOnInit() {
    this.userForm = new FormGroup({
      VpasswordCurrent: new FormControl('', [Validators.required]),
      VpasswordNew: new FormControl('', [Validators.required]),
      VNewRepeatpassword: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  comparatePasswordCurrentAndNew() {
    if (this.passwordCurrent === this.passwordNew) {
      this.WarningPasswordCurrentNew = true;
    }
  }
  comparatePasswordNews() {
    if (this.passwordNew !== this.NewRepeatpassword) {
      this.WarningPasswordNews = true;
    }
  }

  closeWarningPasswordsNew() {
    this.WarningPasswordNews = false;
  }

  closeWarningPasswordCurrentNew() {
    this.WarningPasswordCurrentNew = false;
  }

  public submmit () {
    if (this.userForm.valid) {
      console.log('guardarDatos');
    }
  }
 }
