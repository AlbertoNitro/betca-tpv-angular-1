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
  columns = ['id', 'offername', 'endDate'];
  offers: Offer[];

  constructor(private offerService: OfferService, private dialog: MatDialog) {
    this.offerService.readAll().subscribe(
      offers => this.offers = offers
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
    this.dialog.open(OffersCreateDialogComponent, { width: '60%', height: '90%' } );
  }

  read(offer: Offer) {
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
        this.offerService.delete(offer).subscribe();
      }
    });
  }
}
