import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokensService} from '../../core/tokens.service';
import {UserService} from './user.service';
import {User} from './user.model';
import {UserProfile} from './user-profile.model';
import {MatDialogConfig, MatDialogRef} from '@angular/material';
import {HttpService} from '../../core/http.service';

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
  data: UserProfile;
  userProfile: UserProfile = {mobile: null, password: null};
  submited = true;
  users: User;
  validatorForm = false;

  constructor(private httpService: HttpService, private tokensService: TokensService, private userService: UserService, public dialogRef: MatDialogRef<ProfileDialogComponent>) {

  }

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
  iscomparatePasswordCurrent() {
  }
  comparatePasswordNews() {
    if (this.passwordNew !== this.NewRepeatpassword) {
      this.WarningPasswordNews = true;
    }
  }
  validatorFormulario() {
    if (this.passwordNew === this.NewRepeatpassword && this.passwordCurrent !== this.passwordNew && this.userForm.valid)
    {
      this.validatorForm = true;
      this.submited = false;
    }
  }

  closeWarningPasswordsNew() {
    this.WarningPasswordNews = false;
  }

  closeWarningPasswordCurrentNew() {
    this.WarningPasswordCurrentNew = false;
  }

  submmit() {
      this.userProfile.mobile = this.tokensService.getMobile();
      this.userProfile.password = this.NewRepeatpassword;
      this.userService.updateProfile(this.userProfile).subscribe(response => {
        this.dialogRef.close();
      }, error => {
        console.log('ERROR:', error);
      });

  }
 }
