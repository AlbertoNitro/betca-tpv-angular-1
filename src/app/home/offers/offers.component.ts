import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
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
  columns = ['Id', 'Name', 'EndDate'];
  data: object[];

  constructor(private dialog: MatDialog) {
    this.data = [
      { 'Id': 1,
        'Name': 'Prueba1',
        'EndDate': '03-07-2019',
        'Articles': [
          {
            'Code': 1,
            'Percentage': 12
          },
          {
            'Code': 2,
            'Percentage': 21
          },
          {
            'Code': 3,
            'Percentage': 21
          },
        ]
      },
      { 'Id': 2,
        'Name': 'Prueba2',
        'EndDate': '07-05-2019',
        'Articles': [
          {
            'Code': 1,
            'Percentage': 12
          },
          {
            'Code': 2,
            'Percentage': 21
          },
        ]
      },
      { 'Id': 3,
        'Name': 'Prueba3',
        'EndDate': '03-05-2019',
        'Articles': [
          {
            'Code': 2,
            'Percentage': 5
          }
        ]
      },
      { 'Id': 4,
        'Name': 'Prueba4',
        'EndDate': '03-05-2019',
        'Articles': [
          {
            'Code': 2,
            'Percentage': 5
          }
        ]
      },
      { 'Id': 5,
        'Name': 'Prueba5',
        'EndDate': '03-03-2019',
        'Articles': [
          {
            'Code': 2,
            'Percentage': 5
          }
        ]
      }
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
    this.dialog.open(OffersCreateDialogComponent, { width: '60%', height: '90%' } );
  }

  read(offer: any) {
    // TODO: implement Offer Details in a Dialog
    console.log('Offer Details');
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Read',
        offer: offer
      },
      width: '60%',
      height: '90%'
    };
    this.dialog.open(OffersDetailsDialogComponent, dialogConfig);
  }

  delete(offer: any) {
    console.log(offer, '>>>>>>> Offer to Delete');
    // TODO: implement Offer Delete (API connection)
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
    result => {
      if (result) {
        console.log('Delete Offer');
      }
    });
  }

}
