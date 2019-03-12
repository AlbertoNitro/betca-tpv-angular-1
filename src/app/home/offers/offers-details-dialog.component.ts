import { Component } from '@angular/core';

@Component({
  selector: 'app-offers-details-dialog',
  templateUrl: './offers-details-dialog.component.html'
})
export class OffersDetailsDialogComponent {
  title = 'Articles list';
  columns = ['Id', 'Description', 'Percentage'];
  data: object[];

  constructor() {
    this.data = [
      { 'Id': 1, 'Description': 'Description Article1', 'Percentage': '5' },
      { 'Id': 2, 'Description': 'Description Article2', 'Percentage': '7' },
      { 'Id': 3, 'Description': 'Description Article3', 'Percentage': '3' },
      { 'Id': 4, 'Description': 'Description Article4', 'Percentage': '5' },
      { 'Id': 5, 'Description': 'Description Article5', 'Percentage': '3' },
      { 'Id': 6, 'Description': 'Description Article6', 'Percentage': '14' },
      { 'Id': 7, 'Description': 'Description Article7', 'Percentage': '31' },
    ];
  }

}
