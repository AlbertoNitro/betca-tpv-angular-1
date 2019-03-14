import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';
import {OffersCreateDialogComponent} from './offers-create-dialog.component';
import {OffersDetailsDialogComponent} from './offers-details-dialog.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent {
  static URL = 'offers';
  onlyActiveOffers = false;
  title = 'Offers management';
  columns = ['Id', 'Name', 'End-Date'];
  data: object[];

  constructor(private dialog: MatDialog) {
    this.data = [
      { 'Id': 1, 'Name': 'Prueba1', 'End-Date': '03-07-2019' },
      { 'Id': 2, 'Name': 'Prueba2', 'End-Date': '07-05-2019' },
      { 'Id': 3, 'Name': 'Prueba3', 'End-Date': '03-05-2019' },
      { 'Id': 4, 'Name': 'Prueba4', 'End-Date': '03-05-2019' },
      { 'Id': 5, 'Name': 'Prueba5', 'End-Date': '03-03-2019' },
      { 'Id': 6, 'Name': 'Prueba6', 'End-Date': '14-04-2019' },
      { 'Id': 7, 'Name': 'Prueba7', 'End-Date': '31-12-2019' },
    ];
  }

  search() {
    // TODO implement search with fields
    console.log('Search Offer');
  }

  resetSearch() {
    // TODO implement resetSearch
    console.log('Reset Search');
  }

  create() {
    // TODO: implement Add Offer in a Dialog
    console.log('Add Offer');
    this.dialog.open(OffersCreateDialogComponent, { width: '60%' } );
  }

  read() {
    // TODO: implement Offer Details in a Dialog
    console.log('Offer Details');
    this.dialog.open(OffersDetailsDialogComponent, { width: '60%' } );
  }

  delete() {
    // TODO: implement Offer Delete (API connection)
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
    result => {
      if (result) {
        console.log('Delete Offer');
      }
    });
  }

}
