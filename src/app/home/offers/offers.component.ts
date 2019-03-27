import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';
import { OffersCreateDialogComponent } from './offers-create-dialog.component';
import { OffersDetailsDialogComponent } from './offers-details-dialog.component';

import {Offer} from './offer.model';
import { OfferService } from './offer.service';
import {FormControl, FormGroup} from '@angular/forms';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {
  static URL = 'offers';
  title = 'Offers management';
  columns = ['id', 'offername', 'endDate'];
  offers: Offer[];

  public formSearchOffers: FormGroup;

  constructor(private offerService: OfferService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formSearchOffers = new FormGroup({
      id: new FormControl(''),
      offername: new FormControl(''),
      idArticle: new FormControl(  ''),
      activeOffers: new FormControl(  false),
    });
    this.findAll();
  }

  search(formSubmitted: FormGroup) {
    const id = formSubmitted.controls.id.value;
    const offername = formSubmitted.controls.offername.value;
    const idArticle = formSubmitted.controls.idArticle.value;
    const activeOffers = formSubmitted.controls.activeOffers.value;
    this.offerService.search({id, offername, idArticle, activeOffers}).subscribe(
      results => {
        if (results.length > 0) {
          this.formatEndDate(results);
        } else {
          this.offers = results;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  reset(formSearchOffers: FormGroup) {
    formSearchOffers.controls.id.setValue('');
    formSearchOffers.controls.offername.setValue('');
    formSearchOffers.controls.idArticle.setValue('');
    formSearchOffers.controls.activeOffers.setValue(false);
    this.findAll();
  }

  create() {
    this.dialog.open(OffersCreateDialogComponent, { width: '60%', height: '90%' } ).afterClosed().subscribe(
      result => {
        this.reset(this.formSearchOffers);
      });
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

  findAll() {
    this.offerService.readAll().subscribe(
      results => {
        this.formatEndDate(results);
      },
      error => {
        console.log(error);
      }
    );
  }

  formatEndDate(results) {
    for (const result of results) {
      result.endDate = result.endDate.split('T', 1)[0];
      this.offers = results;
    }
  }
}
