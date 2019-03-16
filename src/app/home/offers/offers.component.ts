import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';
import { OffersCreateDialogComponent } from './offers-create-dialog.component';
import { OffersDetailsDialogComponent } from './offers-details-dialog.component';

import { Offer } from './offer.model';
import { OfferService } from './offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent {
  static URL = 'offers';
  onlyActiveOffers = false;
  title = 'Offers management';
  columns = ['id', 'name', 'endDate'];
  offers: Offer[];

  constructor(private offerService: OfferService, private dialog: MatDialog) {
    this.offerService.readAll().subscribe(
      data => this.offers = data
    );
    console.log(this.offers, '<<<<< OFFERS');
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

  read(offer: Offer) {
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

  delete(offer: Offer) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
    result => {
      if (result) {
        this.offers = this.offers.filter(h => h !== offer);
        // TODO: implement Offer Delete (API connection)
      }
    });
    console.log(this.offers, '<<<<<<<<< Offers');
  }
}
