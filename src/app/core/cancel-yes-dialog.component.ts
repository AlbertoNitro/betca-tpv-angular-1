import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl: 'cancel-yes-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {

  message: string;
  question: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
    this.question = data.question;
  }
}
