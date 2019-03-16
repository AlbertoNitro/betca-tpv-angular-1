import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Offer } from './offer.model';

@Component({
  selector: 'app-offers-details-dialog',
  templateUrl: './offers-details-dialog.component.html'
})
export class OffersDetailsDialogComponent {
  title = 'Articles list';
  columns = ['idArticle', 'percentage'];
  offer: Offer;

  constructor(@Inject(MAT_DIALOG_DATA) data: object) {
    this.offer = data['offer'];
  }
}
