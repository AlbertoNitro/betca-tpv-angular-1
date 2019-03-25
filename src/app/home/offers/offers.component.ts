import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';
import { OffersCreateDialogComponent } from './offers-create-dialog.component';
import { OffersDetailsDialogComponent } from './offers-details-dialog.component';

import { Offer } from './offer.model';
import { OfferService } from './offer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit{
  static URL = 'offers';
  onlyActiveOffers = false;
  title = 'Offers management';
  columns = ['id', 'offername', 'endDate'];
  offers: Offer[];

  public formSearchOffers: FormGroup;

  constructor(private offerService: OfferService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formSearchOffers = new FormGroup({
      id: new FormControl('',
        [Validators.required]),
      offername: new FormControl('',
        [Validators.required]),
      idArticle: new FormControl(  '',
        [Validators.required]),
      activeOffers: new FormControl(  false,
        [Validators.required]),
    });

    this.offerService.readAll().subscribe(
      offers => this.offers = offers
    );
  }

  search(formSubmitted: FormGroup) {
    // TODO implement search with fields
    console.log('Search Offer');
    const id = formSubmitted.controls.id.value;
    const offername = formSubmitted.controls.offername.value;
    const idArticle = formSubmitted.controls.idArticle.value;
    const activeOffers = formSubmitted.controls.activeOffers.value;
    console.log(id, '<<<<< Id Offer');
    console.log(offername, '<<<<< Name Offer');
    console.log(idArticle, '<<<<< Id Article');
    console.log(activeOffers, '<<<<< Active Offer?');
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
