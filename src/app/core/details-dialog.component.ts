import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl: 'details-dialog.component.html',
  styleUrls: ['details-dialog.component.css']

})
export class DetailsDialogComponent {
  object: any;
  title: string;
  properties: string[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.properties = data.properties;
    this.object = data.object;
  }
}
