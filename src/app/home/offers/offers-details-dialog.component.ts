import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-offers-details-dialog',
  templateUrl: './offers-details-dialog.component.html'
})
export class OffersDetailsDialogComponent implements OnInit {
  title = 'Articles list';
  columns = ['Code', 'Percentage'];
  data: object;

  constructor(@Inject(MAT_DIALOG_DATA) offer: object) {
    this.data = offer;
  }

  ngOnInit(): void {
    console.log(this.data, '<<<<<<<< DATA DETAILS');
  }

}
