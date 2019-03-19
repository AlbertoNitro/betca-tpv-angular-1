import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'user-quick-creation-dialog.component.html',
  styleUrls: ['../user-create-update-dialog/user-create-update-dialog.component.css']
})

export class UserQuickCreationDialogComponent implements OnInit {
  userQuickForm: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.userQuickForm = new FormGroup({
      mobile: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required)
    });
  }

  saveUser() {
    // TODO save user
    console.log('Usuario', this.userQuickForm.value);
  }
}
