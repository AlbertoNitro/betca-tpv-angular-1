import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  templateUrl: 'user-quick-creation-dialog.component.html',
  styleUrls: ['../user-create-update-dialog/user-create-update-dialog.component.css']
})

export class UserQuickCreationDialogComponent implements OnInit {
  userQuickForm: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UserQuickCreationDialogComponent>,
              private userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.userQuickForm = new FormGroup({
      mobile: new FormControl(this.data.mobile, [Validators.required, Validators.pattern('[0-9]{9}')]),
      username: new FormControl('', Validators.required)
    });
  }

  saveMinimumUser() {
    // TODO refactor and delete console.log
    this.userService.saveMinimumUser(this.userQuickForm.value).subscribe(response => {
      this.dialogRef.close(response);
    }
    , (error) => {
      console.log('ERROR:', error);
    });
  }
}
