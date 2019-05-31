import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl: 'simple-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']
})
export class SimpleDialogComponent {

  message: string;
  question: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
    this.question = data.question;
  }
}
